const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Schema
const memberSchema = new Schema({
  name:  { 
    last:  { type: String, required: true },
    first: { type: String, required: true } },
  email:   { type: String,
             required: true,
             lowercase: true,
             unique: true },
  password: { type: String, required: true },
  course: [{ type: Schema.Types.ObjectId,
              ref: "Course" }]
});

// Methods
memberSchema.virtual("fullName")
  .get(function() {
    return `${ this.name.last } ${ this.name.first }`
  });
  
memberSchema.methods.getInfo = function() {
  return `氏名：${ this.fullName }　メールアドレス：${ this.email }`
};

module.exports = mongoose.model("Member", memberSchema);

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