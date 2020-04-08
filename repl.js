// // Person 1 : Story 多 の関係
// ////////////////////////////////////////////////////////////////
// // 定義
// // ここで定義することでDBに該当のコレクションがなければ追加される。
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// // POPULATEを学習中なので、ここはコメントアウトする。
// // const User = require("./models/user");
// // const Course = require("./models/course");

// // DB接続
// mongoose.connect(
//   "mongodb://localhost:27017/sample_model",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
//   });

// // create Schema and Model
// // Person 1 : Story 多 の関係
// // 一人の作家は複数の著作を持つことを表現している。
// const personSchema = Schema({
//   _id: Schema.Types.ObjectId,
//   name: String,
//   age: Number,
//   stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
// });
// const Person = mongoose.model('Person', personSchema);

// // 一つの物語には創作した一人の作家が紐付いていることを表現している。
// // Personには作家も居るし、読者も居る。
// const storySchema = Schema({
//   author: { type: Schema.Types.ObjectId, ref: 'Person' },
//   title: String,
//   fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
// });
// const Story = mongoose.model('Story', storySchema);

// mongoose.Promise = global.Promise;

// // 既存のデータを全削除する。
// Person.deleteMany({})
//   .then(person => console.log(`delete document ${ person.n }`))
//   .then(() => {
//     return Story.deleteMany({})
//   })
//   .then(story => console.log(`delete document ${ story.n }`))
//   .catch(error => console.log(error));

// // Document生成
// const author = new Person({
//   _id: new mongoose.Types.ObjectId(),
//   name: "村上春樹",
//   age: 38
// });

// // Document保存と別のコレクションとそのドキュメントの生成
// author.save(function (err) {
//   if (err) return handleError(err);
//   const story1 = new Story({
//     title: "ノルウェーの森",
//     author: author._id    // assign the _id from the person
//   });
//   story1.save(function (err) {
//     if (err) return handleError(err);
//     return console.log(`${ author.name }:${ story1.title }をDBに格納。`);
//   });
// });

// // コードが非同期で動いているので、こちらを先に処理してしまいエラーが起きる。
// // 解決策！
// Story
//   .findOne({ title: "ノルウェーの森" })
//     .populate('author')
//     .exec(function (err, story) {
//       if (err) return handleError(err);
//       console.log(`執筆者は、${ story.author.name }です。`);
//       console.log(story);
//       console.log(story.populated('author')); //ObjectIDを返す。
//       console.log(story.author._id); // 上の命令と同じ。ObjectIDを返す。
//       story.depopulate('author'); //populateを解く
//       console.log(story.populated('author')); //undefine
// });