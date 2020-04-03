const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
  name:  { type: String,
           reqired: true },
  email: { type: String,
           required: true,
           lowercase: true,
           unique: true },
  c_code: { type:Number,
            min: [100, "Course code too short!"],
            max: 999 },
  courses: [{ type: mongoose.Schema.Types.ObjectId,
             ref: "Course" }]
});

// Methods
userSchema.methods.getInfo = function() {
  return `氏名：${ this.name }　メールアドレス：${ this.email }　コース番号：${ this.c_code }`
};

module.exports = mongoose.model("User", userSchema);

// ////////////////////////////////////////////////////////////　課題
// // このコードの造りで他のクエリも作ることができるはず。
// // なぜ、このコードが動かないのかを検証・解決する。
// userSchema.methods.findLocalUsers = function() {
//   return this.model("User")
//   .find({ c_code: this.c_code })
//   .exec();
// };

// ////////////////////////////////////////////////////////////　課題ヒント
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

// // findUsers をクラスメソッドとして書き換える。
// // 定義側のメソッドに変数『query』としておき、
// userSchema.statics.findUsers = function (query, cb) {
//   this.model("User")
//     .find(query, cb);
// };

// // 実行側のメソッドを
// // findUsers <-- class method
// User.findUsers({ zip_code: 319 }, (error, result) => {
//   if (!error) {
//     console.log(result);
//   }
// });