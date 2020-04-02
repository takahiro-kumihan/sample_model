const mongoose = require("mongoose");
const Contact = require("./models/contact");

mongoose.connect(
  "mongodb://localhost:27017/contact",
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true }
);

mongoose.Promise = global.Promise;

/////////////////////////////////////////////
// ここから命令

// // findメソッド（合致するものを配列で返す）
// Contact.find({ email: /mari/ })
//   .then(result => console.log(result))
//   .catch(error => console.log(error));

// // findOneメソッド
// // notice: namaパラメーターをuniqueでvalidateした上で、フルネームで検索しないとダメなメソッド。
// Contact.findOne({ name: /和恵/ })
//   .then(result => console.log(result))
//   .catch(error => console.log(error));
  
// // findByIdメソッド
// Contact.findById("5e856bbcb8bb911767345593")
//   .then(result =>
//     console.log(
//       `name: ${result.name}, email: ${result.email}, content: ${result.content}`
//     )
//   )
//   .catch(error => console.log(error));

// // deleteOneメソッド
// const query = { name: "kaz" };
// Contact.deleteOne(query)
//   .then(console.log(`${ query.name }さんのドキュメントを削除しました。`))
//   .catch(error => console.log(error));

// deleteManyメソッド
Contact.deleteMany({})
  .then(items => console.log(`${ items.n }件全てのドキュメントを削除しました。`))
  .catch(error => console.log(error));

// ドキュメント生成メソッド
// Contact.create(
//   {
//     name: "mair",
//     email: "mari@email.com",
//     content: "mari, hello!"
//   },
//   {
//     name: "kaz",
//     email: "kaz@email.com",
//     content: "kaz, hello!"
//   },
//   {
//     name: "nob",
//     email: "nob@email.com",
//     content: "nob, hello!"
//   },
//   {
//     name: "高広　茉李",
//     email: "mari@j-email.com",
//     content: "茉李, hello!"
//   },
//   {
//     name: "高広　信之",
//     email: "nob@j-email.com",
//     content: "信之, hello!"
//   },
//   {
//     name: "高広　和恵",
//     email: "kaz-t@j-email.com",
//     content: "和恵, hello!"
//   },
//   {
//     name: "吉田　和恵",
//     email: "kaz-y@j-email.com",
//     content: "和恵, hello!"
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