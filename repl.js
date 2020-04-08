// // Member, Course model
// ////////////////////////////////////////////////////////////////
const Member = require("./models/member");
const Course = require("./models/course");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/sample_model",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

// Member.deleteMany({})
//   .then(member => console.log(`delete ${ member.n }`))
//   .then(() => {
//     return Course.deleteMany({})
//   })
//   .then(course => console.log(`delete ${ course.n }`))
//   .catch(err => console.log(err));

// const participant = new Member({
//   name: { last: "高広", first: "信之" },
//   email: "nob@taka.com",
//   password: "123"
// });

// participant.save(function (err) {
//   if (err) return handleError(err);
//   const course1 = new Course({
//     title: "西洋史",
//     participant: participant._id
//   });
//   course1.save(function (err) {
//     if (err) return handleError(err);
//     return console.log("Created")
//     // return console.log(`${participant.name.first } : ${ course1.title }`);
//   });
//   const course2 = new Course({
//     title: "日本史",
//     participant: participant._id
//   });
//   course2.save(function (err) {
//     if (err) return handleError(err);
//     return console.log("Created")
//     // return console.log(`${participant.name.first } : ${ course1.title }`);
//   });
//   const course3 = new Course({
//     title: "音楽",
//     participant: participant._id
//   });
//   course3.save(function (err) {
//     if (err) return handleError(err);
//     return console.log("Created")
//     // return console.log(`${participant.name.first } : ${ course1.title }`);
//   });
// });

Course
  .findOne({ title: "西洋史" })
  .populate("participant")
  .exec(function (err, course) {
    if (err) return handleError(err);
    console.log(course);
  });
Course
  .findOne({ title: "日本史" })
  .populate("participant")
  .exec(function (err, course) {
    if (err) return handleError(err);
    console.log(course);
  });
Course
  .findOne({ title: "音楽" })
  .populate("participant")
  .exec(function (err, course) {
    if (err) return handleError(err);
    console.log(course);
  });



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
//   .catch(err => console.log(err));

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