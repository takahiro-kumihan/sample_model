"use strict";

// 勿論このやり方もあるが、このアプリでは以下にで統一。
// const mongoose = require("mongoose"),
//         Schema = mongoose.Schema;

const mongoose = require("mongoose"),
{ Schema } = mongoose,
courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  cost: {
    type: Number,
    required: true
  },
  discription: {
    type: String,
    required: true
  },
  items: [],
  zip_code: {
    type: Number,
    min: [100, "コース番号の桁が短いです"],
    max:  999
  }
})

module.exports = mongoose.model("Course", courseSchema)