const mongoose = require("mongoose");

// Schema
const contactSchema = mongoose.Schema({
  name: String,
  email: String,
  content: String
});

module.exports = mongoose.model("contact", contactSchema);