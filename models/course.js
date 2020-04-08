const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Schema
const courseSchema = new Schema({
  title: {
    type: String,
    reqired: true,
    unique: true
  },
  // description: {
  //   type: String,
  //   required: true,
  // },
  participant: [{
    type: Schema.Types.ObjectId, ref: "Member"
  }]
});

module.exports = mongoose.model("Course", courseSchema);