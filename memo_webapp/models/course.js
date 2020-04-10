"use strict";

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
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
});

module.exports = mongoose.model("Course", courseSchema)