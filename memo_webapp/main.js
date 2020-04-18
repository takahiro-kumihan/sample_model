"use strict";

// expressをロードする。
const express = require("express"),
      // expressをインスタンスとして保持する。
      app = express(),
      router = express.Router();

// portの確保（オプション--環境変数で指定がなければ3000番を使う。）
app.set("port", process.env.PORT || 3000);

// 本文の解析で、
// URLエンコーディングとJSONパラメータの処理を行う。
// ///////////////////////////////////////////////全然理解してない箇所
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// for DB
const mongoose = require("mongoose");

// DBに接続
mongoose.connect(
  // DB名：form
  "mongodb://localhost:27017/recipi_db",
  // エラーの対処
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true });
  mongoose.set("useCreateIndex", true);

  //   mongoDBへ該当のDBを接続
  const db = mongoose.connection;
  //   接続確認のログを出力する
  db.once("open", () => {
    console.log("DBへの接続は成功しました。")
  });

// Promise
// mongooseのPromiseではなく、グローバルのpromiseを使う。
mongoose.Promise = global.Promise;

// 静的ファイルの関連付け
//   イメージ、CSS ファイル、JavaScript ファイルなどの
//   静的ファイルを提供するには、Express に標準実装されている
//   express.static ミドルウェア関数を使用する。
//   静的アセットファイルを格納しているディレクトリーの名前を
//   express.static ミドルウェア関数に渡して、
//   ファイルの直接提供を開始する。
router.use(express.static("assets"));

// レイアウト
//   viewに関連するファイルの経路の起点となるディレクトリを有効にする
const layouts = require("express-ejs-layouts");
//   ejs形式ファイルの使用を設定
app.set("view engine", "ejs");
//   express-ejs-layoutsモジュールを使うことを宣言する
//   viewsディレクトリにファイルを配置する
//   レイアウトのための設計図であるlayouts.ejsが必須
router.use(layouts);

// controllerのメソッドをロードする    
const offeredCoursesCtl = require("./controllers/offeredCoursesCtl");
const subscribersCtl = require("./controllers/subscribersCtl");
const usersCtl = require("./controllers/usersCtl");

// PUTメソッドをエミュレートするためのモジュールをロードする
const methodOverride = require("method-override");
router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

// 経路
//   リクエストが来た時の反応をここでスイッチングしていく
//   for index.ejs
app.use("/", router);

router.get("/", (req, res) => {
  // 初期状態の様子をみるため、ブラウザに文字列を送信する
  // res.send("Here is ROOT.");
  res.render("index");
});

//   for cooking_course
router.get("/courses",
  offeredCoursesCtl.getAllCourses, (req, res, next) => {
    res.render("courses", { Offered_courses: req.data });
  }
);

// for subscriber module
router.get("/subscribers", subscribersCtl.index, subscribersCtl.indexView);
router.get("/subscribers/new", subscribersCtl.new);
router.post("/subscribers/create", subscribersCtl.create, subscribersCtl.redirectView);
router.get("/subscribers/:id", subscribersCtl.show, subscribersCtl.showView);
router.get("/subscribers/:id/edit", subscribersCtl.edit);
router.put("/subscribers/:id/update", subscribersCtl.update, subscribersCtl.redirectView);
router.delete("/subscribers/:id/delete", subscribersCtl.delete, subscribersCtl.redirectView);

// //   for contact-FORM フォームへの記入ページ
// //     1行目は、express-ejs-layoutsで場所を特定している
// router.get("/contact", subscribersCtl.getSubscriberPage);
// //   for contact-POST 投稿とその後の振る舞い
// router.post("/thanks", subscribersCtl.saveSubscriber);
// //   for contact-LIST フォームで集めた全データをリストで見せる
// router.get("/subscribers/new", subscribersCtl.new);
// router.get("/subscribers", 
//   subscribersCtl.getAllSubscribers, (req, res, next) => {
//           res.render("subscribers", { Subscribers: req.data }); 
//         }
// );

// for user module
// router.get("/users", usersCtl.index);
router.get("/users", usersCtl.index, usersCtl.indexView);
router.get("/users/new", usersCtl.new);
router.post("/users/create", usersCtl.create, usersCtl.redirectView);
router.get("/users/:id", usersCtl.show, usersCtl.showView);
router.get("/users/:id/edit", usersCtl.edit);
router.put("/users/:id/update", usersCtl.update, usersCtl.redirectView);
router.delete("/users/:id/delete", usersCtl.delete, usersCtl.redirectView);

// アプリがPORTを監視するための設定
app.listen(app.get("port"), () => {
  console.log(`サーバーはhttp://localhost:${ app.get("port") }で起動しています。`);
});