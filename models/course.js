const mongoose = require("mongoose");

// Schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    reqired: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  c_code: {
    type: Number,
    min: [100, "Course code too short!"],
    max: 999
  },
  hint: []
});

module.exports = mongoose.model("Course", courseSchema);