"use strict";

const Course = require("../models/course");

exports.showCourses = (req, res) => {
  res.render("courses");
};

// DB全データを取得する
exports.getAllCourses = (req, res) => {
  Course.find({})
    .exec()
    .then(courses => {
      res.render("courses", {
        Courses: courses
      });
    })
    // プロミスを破ったエラーを掴む　という表現がよくわからない？
    .catch( (error) => {
      console.log(error.message);
      return [];
    })
    // // ログを出す。ただし、この処理要るのか？
    // .then( () => {
    //   console.log("promiseは完了です。")
    // });
};