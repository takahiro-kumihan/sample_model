const mongoose = require("mongoose");
const User = require("./models/user");

mongoose.connect(
  "mongodb://localhost:27017/contact",
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true }
);

mongoose.Promise = global.Promise;

/////////////////////////////////////////////
User.find({})
  // .exec()
  .then(query => {
    query.forEach(i => console.log(i.name))
  });

/////////////////////////////////////////////
// モデルで定義したインスタンスメソッドを試す
findOne
User.findOne({ email: "nob@j-email.com" })
  .then(result => {
    console.log(result.getInfo());
  });

// //////////////////////////////////////// ERRORが解決できない！
// findUsers
// User.findUsers();
// => Uncaught TypeError: User.findUser is not a function

////////////////////////////////////////////
// クラスメソッドを試す
User.findUsers(319, (error, result) => {
  if (!error) {
    console.log(result);
  }
});

User.findUsers({ zip_code: 319 }, (error, result) => {
  if (!error) {
    console.log(result);
  }
});


/////////////////////////////////////////////
// 定型命令

// // findメソッド（合致するものを配列で返す）
// User.find({ email: /mari/ })
//   .then(result => console.log(result))
//   .catch(error => console.log(error));

// // findOneメソッド
// // notice: namaパラメーターをuniqueでvalidateした上で、フルネームで検索しないとダメなメソッド。
// User.findOne({ name: /和恵/ })
//   .then(result => console.log(result))
//   .catch(error => console.log(error));
  
// // findByIdメソッド
// User.findById("5e856bbcb8bb911767345593")
//   .then(result =>
//     console.log(
//       `name: ${result.name}, email: ${result.email}, c_code: 0331
//     )
//   )
//   .catch(error => console.log(error));

// // deleteOneメソッド
// const query = { name: "kaz" };
// User.deleteOne(query)
//   .then(console.log(`${ query.name }さんのドキュメントを削除しました。`))
//   .catch(error => console.log(error));

// // deleteManyメソッド
// User.deleteMany({})
//   .then(items => console.log(`${ items.n }件全てのドキュメントを削除しました。`))
//   .catch(error => console.log(error));

// ドキュメント生成メソッド
// User.create(
//   {
//     name: "mair",
//     email: "mari@email.com",
//     c_code: 0319
//   },
//   {
//     name: "kaz",
//     email: "kaz@email.com",
//     c_code: 0626
//   },
//   {
//     name: "nob",
//     email: "nob@email.com",
//     c_code: 0331
//   },
//   {
//     name: "高広　茉李",
//     email: "mari@j-email.com",
//     c_code: 0319
//   },
//   {
//     name: "高広　信之",
//     email: "nob@j-email.com",
//     c_code: 0331
//   },
//   {
//     name: "高広　和恵",
//     email: "kaz-t@j-email.com",
//     c_code: 0626
//   },
//   {
//     name: "吉田　和恵",
//     email: "kaz-y@j-email.com",
//     c_code: 0626
//   })
//   .then(ins => console.log(ins))
//   .catch(error => console.log(error));

/////////////////////////////////////////////
// execって、結局は何ですか問題

// // 同期処理　上から順に処理される
// console.log(1);
// console.log(2);
// console.log(3);

// // 非同期処理
// // => log(1)、setTimeout(...)、log(3)上から順にキューに登録
// // => log(1)　実行
// // => setTimeout(...)　setTimeout　実行、log(2)　キューに登録
// // => log(3)　実行
// // -----ここまでが同期処理、ここから非同期処理-----
// // => log(2)　タイマーに登録されてから一秒後に実行
// //            〇秒後に実行しても結果は同じ
// console.log(1);
// setTimeout( () => { console.log(2) }, 0);
// console.log(3);
// // コールバック
// // setTimeout関数の引数にlog関数を渡し、
// // setTimeoutからlogを呼び出すこと。