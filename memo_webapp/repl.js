"use strict";

const mongoose = require("mongoose"),
      Course = require("./models/course"),
      Subscriber = require("./models/subscriber");
var tmpCourse, tmpSubscriber;

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
// リレーション
Course.create({
  title: "トマトの国",
  description: "トマトソースで和えたパスタ。",
  zip_code: 626,
  items: ["トマト", "パスタ"]
})
  .then(query => tmpCourse = query);

Subscriber.findOne({})
  .then(query => tmpSubscriber = query);

tmpSubscriber.courses.push(tmpCourse);
tmpSubscriber.save();
Subscriber.populate(tmpSubscriber, "courses")
  .then(query => console.log(query));

// const mongoose = require("mongoose"),
//   User = require("./models/user");

// mongoose.connect(
//   "mongodb://localhost:27017/recipi_db",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true
//   }
// );

// mongoose.Promise = global.Promise;

// // tmp create
// var tmpUser;
// User.create({
//   name: {
//     last: "高広",
//     first: "信之"
//   },
//   email: "nob@taka.com",
//   password: "pass123",
// })
// .then(ins => tmpUser = ins)
// .catch(error => console.log(error.message));

////////////////////////////////////////////////////////////
// // today 200329
// const mongoose = require("mongoose"),
//   user = require("./models/person");
//   user = require("./models/story");

// mongoose.connect(
//   "mongodb://localhost:27017/card",
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

// mongoose.Promise = global.Promise;

// user.create({
//     name: "paul mac",
//     age: 40
//   })
//   .then(user => console.log(user))
//   .catch(error => console.log(error.message));

/////////////////////////////////////////////////////////
// // today 200328
// const mongoose = require("mongoose"),
//   user = require("./models/user");

// mongoose.connect(
//   "mongodb://localhost:27017/study",
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

// mongoose.Promise = global.Promise;

// user.create({
//     name: "paul mac",
//     age: 40
//   })
//   .then(user => console.log(user))
//   .catch(error => console.log(error.message));

//////////////////////////////////////////////////////////////
// const mongoose = require("mongoose"),
//   Subscribers = require("./models/subscribers");

// mongoose.connect(
//   "mongodb://localhost:27017/recipi_db",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true
//   }
// );

// mongoose.Promise = global.Promise;

// Subscribers.create({
//     name: "john lennon",
//     email: "john@lennon.com",
//     zip_code: 5731114
//   })
//   .then(Subscribers => console.log(Subscribers))
//   .catch(error => console.log(error.message));

// var subscriber;
// Subscribers.findOne({
//   name: "john lennon"
// }).then(result => {
//   subscriber = result;
//   console.log(subscriber.getInfo());
// });