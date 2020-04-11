"use strict";

const mongoose = require("mongoose"),
      Course = require("./models/course"),
      Subscriber = require("./models/subscriber"),
      User = require("./models/user");

// インスタンスの中、代入されて以降の範囲で使えるローカル変数を
// インスタンスの外側で定義する。
var tmpCourse, tmpSubscriber, tmpUser;

mongoose.connect(
  "mongodb://localhost:27017/recipi_db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

mongoose.Promise = global.Promise;

/////////////////////////////////////////////
// create User model
User.deleteMany({})
  .exec()
  .then(docs => console.log(`\n>>>> User document Delete: ${docs.n}`))
  .then(() => {
    return Subscriber.deleteMany({});
  })
  .then(docs => console.log(`>>>> Subscriber document Delete ${docs.n}`))
  .then(() => {
    return User.create({
      name: {
        last: "John",
        first: "Lennon",
      },
      email: "john@lennon.com",
      password: "pw123",
    });
  })
  // .then(user => { tmpUser = user; })
  .then(user => tmpUser = user)
  .then(() => {
    return Subscriber.create({
      name: "Jonny",
      email: "john@lennon.com",
      zip_code: 1009
    })
  })
  .then(() => {
    // return Subscriber[0];
    return Subscriber.findOne({ email: tmpUser.email });
  })
  .then(subscriber => {
    tmpUser.subscribed_account = subscriber;
    tmpUser.save().then(() => console.log(`${ tmpUser }\n>>>> Data updated!`));
  })
  ///////////////////////////////// // なぜローカル変数が展開されないのか？
  ///////////////////////////////// // なぜ、非同期処理のワナにひっかかっているのか？
  // .then(tmpCourse => {
  //   tmpCourse = "Greeting Hello, tmplate Course model!";
  // })
  // .then(() => { console.log(`hellohello ${ tmpCourse }`); })
  .catch((error) => console.log(error.message));

// /////////////////////////////////////////////
// // リレーション
// Course.create({
  //   title: "トマトの国",
  //   description: "トマトソースで和えたパスタ。",
  //   zip_code: 626,
  //   items: ["トマト", "パスタ"]
  // })
  //   .then(query => tmpCourse = query);
  
  // Subscriber.findOne({})
  //   .then(query => tmpSubscriber = query);
  
  // tmpSubscriber.courses.push(tmpCourse);
  // tmpSubscriber.save();
  // Subscriber.populate(tmpSubscriber, "courses")
  //   .then(query => console.log(query));