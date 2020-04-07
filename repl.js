// ////////////////////////////////////////////////////////////////
// const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb://localhost:27017/sample_model",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
//   }
//   );
 
// const Schema = mongoose.Schema;

// const personSchema = Schema({
//   _id: Schema.Types.ObjectId,
//   name: String,
//   age: Number,
//   stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
// });

// const storySchema = Schema({
//   author: { type: Schema.Types.ObjectId, ref: 'Person' },
//   title: String,
//   fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
// });

// const Story = mongoose.model('Story', storySchema);
// const Person = mongoose.model('Person', personSchema);

// const author = new Person({
//   _id: new mongoose.Types.ObjectId(),
//   name: 'Ian Fleming',
//   age: 50
// });

// author.save(function (err) {
//   if (err) return handleError(err);

//   const story1 = new Story({
//     title: 'Casino Royale',
//     author: author._id    // assign the _id from the person
//   });

//   story1.save(function (err) {
//     if (err) return handleError(err);
//     return console.log("thats it!");
//   });
// });

// Story.
//   findOne({ title: 'Casino Royale' }).
//   populate('author').
//   exec(function (err, story) {
//     if (err) return handleError(err);
//     console.log(`The author is ${ story.author.name }`);
//     console.log(story);
// });

////////////////////////////////////////////////////////////////////
const mongoose = require("mongoose");
const User = require("./models/user");
const Course = require("./models/course");

mongoose.connect(
  "mongodb://localhost:27017/sample_model",
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true }
);

mongoose.Promise = global.Promise;

User.deleteMany({})
  .then(user => console.log(`\n>${ user.n }個のデータを削除しました。`))
  .then(() => {
    return Course.deleteMany({});
  })
  .then(course => console.log(`>${ course.n }個のデータを削除しました。`))
  .then(() => {
    return User.create(
      {
        name: "高広信之",
        email: "nob@j-email.com",
        c_code: 331
      },
      {
        name: "高広和恵",
        email: "kaz@j-email.com",
        c_code: 626
      },
      {
        name: "高広茉李",
        email: "mari@j-email.com",
        c_code: 319
      })
      .then(user => tmpUser = user)
    })
    .then(() => {
      return Course.create({
        title: "日本中世史",
        description: "日本の中世史を院政を中心に解説",
        c_code: 331
      }, {
        title: "西洋史",
        description: "西洋史をドイツ中心に解説",
        c_code: 319
      }, {
        title: "家政",
        description: "料理について解説",
        c_code: 626
      })
      .then(course => tmpCourse = course)
  })
  .then(tmpUser.forEach(user => {
        return console.log(user.c_code);
  })
  .then(() => {
    course => user.courses.push(course);
    user.save();
    User.populate(tmpUser, "courses") 
  })
  .then(user => console.log(user))
  .then(() => {
    tmpUser.forEach(ins => {
        return console.log(ins.email);
      })
    })
    .then(() => {
      tmpCourse.forEach(ins => {
          return console.log(ins.title);
        })
      })
  .catch(error => console.log(error))

// //////////////////////////////////////////////////////////////////////////
// // アソシエーしょ　応用バージョン
// User.deleteMany({})
//   .then(ins => console.log(`\n>> ${ins.n}のドキュメントを破棄しました。`))
//   .then(() => {
//     return Course.deleteMany({});
//   })
//   .then(ins => console.log(`>> ${ins.n}のドキュメントを破棄しました。`))
//   .then(() => {
//     return User.create({ name: "nob", email: "nob@email.com", c_code: 331 });
//   })
//   .then(User => {
//     console.log(
//       `>> Userモデルのドキュメント\n>> ${User.getInfo()}\n>> を生成しました。`
//     );
//   })
//   .then(() => {
//     return User.findOne({ name: "nob" });
//   })
//   .then(ins => {
//     tmpUser = ins;
//     console.log(`>> 検索したユーザーは\n>> ${ins.getInfo()}`);
//   })
//   .then(() => {
//     return Course.create({
//       title: "中世史",
//       description: "日本の中世史を6ヶ月間で学ぶコースです。",
//       c_code: 331,
//       hint: ["平清盛", "足利義満"]
//     });
//   })
//   .then(ins => {
//     tmpCourse = ins;
//     console.log(`>> ${ins.title}コースを生成しました。`);
//   })
//   .then(() => {
//     tmpUser.courses.push(tmpCourse);
//     tmpUser.save();
//   })
//   .then(() => {
//     return User.populate(tmpUser, "courses");
//   })
//   .then(ins => console.log(ins))
//   .then(() => {
//     return User.find({
//       courses: mongoose.Types.ObjectId(tmpCourse._id)
//     });
//   })
//   .then(ins => console.log(ins))
//   .catch(error => console.log(error));


// ////////////////////////////////////////////////
// // アソシエーション まず、失敗してるやつ。
// var tmpCourse, tmpUser;

// // Course.create({
// //     title: "西洋史",
// //     description: "西洋史をドイツ中心に解説",
// //     c_code: 319,
// //     hint: ["フリードリッヒ2世", "ゲーテ"]
// //   })
// //   .then(ins => tmpCourse = ins);
  
// User.findOne({}).then(ins => tmpUser = ins);
// // UserモデルのcoursesPARSMS => coursesメソッド
// tmpUser.courses.push(tmpCourse);
// tmpUser.save();
// User.populate(tmpUser, "courses")
//   .then(ins => console.log(ins));

// // 複数のコースを該当者に割り当てたいよね。
// // サンプルだと一つのコースを該当者に割り当てていくようだけど。。。？
//   // Course.create({
//   //     title: "日本中世史",
//   //     description: "日本の中世史を院政を中心に解説",
//   //     c_code: 331
//   //   },{
//   //     title: "西洋史",
//   //     description: "西洋史をドイツ中心に解説",
//   //     c_code: 319
//   //   },{
//   //     title: "家政",
//   //     description: "料理について解説",
//   //     c_code: 626
//   //   })
//   //   .then(ins => tmpCourse = ins);
  
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


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
//   { name: "nob",
//     email: "nob@email.com",
//     c_code: 331 })
//   .then(ins => console.log(ins))
//   .catch(error => console.log(error));

// User.create(
//   {
//     name: "mair",
//     email: "mari@email.com",
//     c_code: 319
//   },
//   {
//     name: "kaz",
//     email: "kaz@email.com",
//     c_code: 626
//   },
//   {
//     name: "nob",
//     email: "nob@email.com",
//     c_code: 331
//   })
//   .then(ins => console.log(ins))
//   .catch(error => console.log(error));

// User.create(
//   {
//     name: "高広信之",
//     email: "nob@j-email.com",
//     c_code: 331
//   },
//   {
//     name: "高広和恵",
//     email: "kaz@j-email.com",
//     c_code: 626
//   },
//   {
//     name: "高広茉李",
//     email: "mari@j-email.com",
//     c_code: 319
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

// //////////////////////////////////////// ERRORが解決できない！
// User.find({})
//   // .exec()
//   .then(query => {
//     query.forEach(i => console.log(i.name))
//   });

// /////////////////////////////////////////////
// // モデルで定義したインスタンスメソッドを試す
// // findOne
// User.findOne({ email: /nob/ })
//   .then(result => {
//     console.log(result.getInfo());
//   });

// //////////////////////////////////////// ERRORの出るメソッド
// // findUsers
// User.findLocalUsers();
// => Uncaught TypeError: User.findUser is not a function

// ////////////////////////////////////////////
// // クラスメソッドを試す
// User.findUsers(319, (error, result) => {
//   if (!error) {
//     console.log(result);
//   }
// });

// User.findUsers({ zip_code: 319 }, (error, result) => {
//   if (!error) {
//     console.log(result);
//   }
// });