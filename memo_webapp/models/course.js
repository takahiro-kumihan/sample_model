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
  discription: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    default: 0,
    min: [0, "値段は、マイナスの値を持つことができません。"]

  },
  max_students: {
    type: Number,
    default: 0,
    min: [0, "受講者数は、マイナスの値を持つことができません。"]
  }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema)