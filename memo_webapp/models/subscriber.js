"use strict";

const mongoose = require("mongoose");

// for schema
const subscriberSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  zip_code: {
    type: Number,
    nim: [1000, "郵便番号が短いです。"],
    max:  9999
  },
  // リレーション
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

// メソッドを設定する
subscriberSchema.methods.getInfo = function() {
  return `Name: ${ this.name }  Email: ${ this.email }  Zip Code: ${ this.zip_code }`;
};

// 稼働せず
// subscriberSchema.methods.findLocalSubscribers = function() {
//   return this.model("Subscribers")
//     .find({ zip_code: this.zip_code })
//     .exec()
// };

// モデルの生成
module.exports = mongoose.model("Subscriber", subscriberSchema);