"use strict";


// 1つ階層を上がったところにある『models』Dのcontacts.jsファイル
// modelを参照している、つまりmodelインスタンスを定数に格納
const Course = require("../models/course"),
  getCourseParams = (body) => {
    return {
      title: body.title,
      discription: body.discription,
      cost: parseInt(body.cost)
    };
  };

module.exports = {
  new: (req, res) => {
    res.render("courses/new");
  },
  create: (req, res, next) => {
    let courseParams = getCourseParams(req.body);
    Course.create(courseParams)
      .then((course) => {
        res.locals.redirect = "/courses";
        res.locals.course = course;
        next();
      })
      .catch((err) => {
        console.log(`Error saving course: ${ err.message }`);
        next(err);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let course_id = req.params.id;
    Course.findById(course_id)
      .then(course => {
        res.locals.course = course;
        next();
      })
      .catch(err => {
        console.log(`Error fetching course by ID: ${ err.message }`);
        next(err);
      });
  },
  showView: (req, res) => {
    res.render("courses/show");
  },
  edit: (req, res, next) => {
    let course_id = req.params.id;
    Course.findById(course_id)
      .then(course => {
        res.render("courses/edit", {
          course: course
        });
      })
      .catch(err => {
        console.log(`Error feching course by ID: ${ err.message }`);
        next(err);
      });
  },
  update: (req, res, next) => {
    let course_id = req.params.id,
      courseParams = getCourseParams(req.body);
    Course.findByIdAndUpdate(course_id, {
      $set: courseParams })
      .then(course => {
        res.locals.redirect = `/courses/${ course_id }`;
        res.locals.course = course;
        next();
      })
      .catch(err => {
        console.log(`Error updating course by ID: ${ err.message }`);
        next(err);
      });
  },
  delete: (req, res, next) => {
    let course_id = req.params.id;
    Course.findByIdAndRemove(course_id)
      .then(() => {
        res.locals.redirect = "/courses";
        next();
      })
      .catch(err => {
        console.log(`Error deleting course by ID: ${ err.message }`);
        next;
      });
  },
  index: (req, res, next) => {
    Course.find({})
      .then((courses) => {
        res.locals.courses = courses;
        next();
      })
      .catch((err) => {
        console.log(`Error fetching courses: ${ err.message }`);
        next(err);
      });
  },
  indexView: (req, res) => {
    res.render("courses/index");
  }
}