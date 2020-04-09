// ////////////////////////////////////////////////////////////////
const mongoose = require("mongoose");
// const Member = require("./models/member");
// const Course = require("./models/course");
const Employee = require("./models/one2many").Employee;
const Unit = require("./models/one2many").Unit;
mongoose.connect(
  "mongodb://localhost:27017/sample_model",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

mongoose.Promise = global.Promise;

////////////////////////////////////////////////////////////////
Employee.deleteMany({})
  .then((docs) => console.log(`Delete ${ docs.n } documents.`))
  .then(() => {
    return Unit.deleteMany({});
  })
  .then((docs) => console.log(`Delete ${ docs.n } documents.`))
  .then(() => {
    return Employee.create({
      name: "高広"
    });
  })
  .then((employee) => {
    Unit.create({
      name: "京都",
      employees: employee._id,
    });
    console.log(`${ employee.name }さんを追加しました。`);
  })
  .then(() => {
    return Employee.create({
      name: "木田"
    });
  })
  .then((employee) => {
    Unit
      .findOne({ name: "京都" })
      .then((unit) => {
        unit.employees.push(employee._id);
        unit.save();
      });
    console.log(`${employee.name}さんを追加しました。`);
  })
  .then(() => {
    return Employee.create({
      name: "竹中"
    });
  })
  .then((employee) => {
    Unit
      .findOne({ name: "京都" })
      .then((unit) => {
        unit.employees.push(employee._id);
        unit.save();
      });
    console.log(`${employee.name}さんを追加しました。`);
  })
  .catch((err) => {
    console.log(err);
  })
////////////////////////////////////////////////////////////////

// // 一旦、DBのCollectionを削除する。
// Member.deleteMany({})
//   .then(member => console.log(`Delete ${ member.n } document.`))
//   .then(() => {
//     return Course.deleteMany({});
//   })
//   .then(course => console.log(`Delete ${ course.n } document.`))
//   .catch(err => console.log(err));

// // 新規メンバーをteacherというインスタンス名で作成する。
// const teacher = new Member({
//   _id: new mongoose.Types.ObjectId(),
//   name: { last: "高広", first: "信之" },
//   email: "nob@taka.com",
//   password: "123"
// });

// // teacherインスタンスにteacher PARAMSと関連付けて、コースを新規で生成する。
// // #1
// teacher.save(function (err) {
//   if (err) return(err);
//   const course = new Course({
//     title: "日本史",
//     teacher: teacher._id,
//     participants: [],
//     description: "中世の日本史を学びます。"
//   });
//   course.save(function (err) {
//     if (err) return(err);
//   });
// });

// // #2
// const teacher = new Member({
//   _id: new mongoose.Types.ObjectId(),
//   name: { last: "高広", first: "茉李"},
//   email: "mari@taka.com",
//   password: "456"
// });

// teacher.save(function(err){
//   if (err) return(err);
//   console.log(teacher);
//   const course = new Course({
//     title: "西洋史",
//     teacher: teacher._id,
//     participants: [],
//     description: "ギリシャ・ローマの世界観"
//   });
//   course.save(function(err) {
//     if (err) return(err);
//     console.log(course);
//   });
// });

// // #3
// const teacher = new Member({
//   _id: new mongoose.Types.ObjectId(),
//   name: { last: "高広", first: "和恵"},
//   email: "kazu@taka.com",
//   password: "789"
// });

// teacher.save(function(err){
//   if (err) return(err);
//   console.log(teacher);
//   const course = new Course({
//     title: "楽典",
//     teacher: teacher._id,
//     participants: [],
//     description: "バッハの音楽系譜と文化"
//   });
//   course.save(function(err) {
//     if (err) return(err);
//     console.log(course);
//   });
// });


// // POPULATE
// Course
//   // .findOne({ title: "日本史" })
//   .findOne({ title: "西洋史" })
//   // .findOne({ title: "楽典" })
//   .populate("teacher")
//   .exec(function(err, course) {
//     if (err) return(err);
//     console.log(course);
//     // console.log(course.teacher.name.last);
//   });

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