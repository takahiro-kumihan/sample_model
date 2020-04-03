const mongoose = require("mongoose");

// Schema
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  c_code: Number
});

module.exports = mongoose.model("user", userSchema);

///////////////////////////////////////////
// // continue
// // Define Instance Methods
// // getInfo <-- instance method
// userSchema.methods.getInfo = function () {
//   return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zip_code}`;
// };

// // findUsers #1 <-- class method
// userSchema.statics.findUsers = function(zip_code, cb) {
  //   this.model("User")
  //   .find({ zip_code: zip_code }, cb);
  // };
