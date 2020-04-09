const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Schema
const courseSchema = new Schema({
  title: {
    type: String,
    reqired: true,
    unique: true,
  },
  teacher: { type: Schema.Types.ObjectId, ref: "Member" },        // 『講座』の『先生』は一人
  participants: [{ type: Schema.Types.ObjectId, ref: "Member" }], // 『講座』の『受講生（生徒）』は複数
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);