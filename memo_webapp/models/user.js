"use strict";

// 勿論このやり方もあるが、このアプリでは以下にで統一。
// const mongoose = require("mongoose"),
//         Schema = mongoose.Schema;

const mongoose = require("mongoose"),
{ Schema } = mongoose,
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
  return `${ this.name.first } ${ this.name.last }`;
});

// module
module.exports = mongoose.model("User", userSchema);