"use strict";

const bcrypt = require("bcrypt");

// 接続に成功したら後で削除する行
// const Subscriber = require("./subscriber")

// 勿論このやり方もあるが、このアプリでは以下にで統一。
// const mongoose = require("mongoose"),
//         Schema = mongoose.Schema;

const mongoose = require("mongoose"),
{ Schema } = mongoose,
Subscriber = require("./subscriber"),
Course = require("./course"),
userSchema = new Schema({
  name: {
    first: {
      type: String,
      trim: true
    },
    last: {
      type: String,
      trim: true
    }
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  zip_code: {
    type: Number,
    min: [1000, "Zip code too short"],
    max: 9999
  },
  password: {
    type: String,
    required: true
  },
  courses: [{
    type: Schema.Types.ObjectId, ref: "Course"
  }],
  subscribed_account: {
    type: Schema.Types.ObjectId, ref: "Subscriber"
  }
}, { timestamps: true });

// ユーザーのフルネームを取得するparams
userSchema.virtual("fullName").get(function(){
  return `${ this.name.last } ${ this.name.first }`;
});

// クエリを保存する前にsubscribed_accountに接木する。
userSchema.pre("save", function (next) {
  let user = this;
  if (user.subscribed_account === undefined) {
    Subscriber.findOne({
      email: user.email
    })
      .then(subscriber => {
        user.subscribed_account = subscriber;
        next();
      })
      .catch(err => {
        console.log(`Error in connecting subscriber: ${err.massage}`);
        next(err);
      });
  } else {
    next();
  }
});

userSchema.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => {
      console.log(`Error in hashing password: ${err.message}`);
    });
});

// method
userSchema.methods.pwCompare = function(inputPw) {
  let user = this;
  return bcrypt.compare(inputPw, user.password);
};

// module
module.exports = mongoose.model("User", userSchema);