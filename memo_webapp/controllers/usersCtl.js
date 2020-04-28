"use strict";

const User = require("../models/user"),
  getUserParams = (body) => {
    return {
      name: {
        first: body.first,
        last: body.last,
      },
      email: body.email,
      password: body.password,
      zip_code: body.zip_code,
    };
  };

module.exports = {
  new: (req, res) => {
    res.render("users/new");
  },
  create: (req, res, next) => {
    let userParams = getUserParams(req.body);
    User.create(userParams)
      .then((user) => {
        // req.flash("success",
        //   `${ user.fullName }さんのアカウントを作成しました。`);
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch((err) => {
        console.log(`Error saving user: ${ err.message }`);
        res.locals.reidrect = "/users/new";
        req.flash("errror",
          `会員アカウントの作成に失敗しました。log：${ err.message }`);
        next();
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let user_id = req.params.id;
    User.findById(user_id)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(err => {
        console.log(`Error fetching user by ID: ${ err.message }`);
        next(err);
      });
  },
  showView: (req,res) => {
    res.render("users/show");
  },
  edit: (req, res, next) => {
    let user_id = req.params.id;
    User.findById(user_id)
      .then(user => {
        res.render("users/edit", {
          user: user
        });
      })
      .catch(err => {
        console.log(`Error feching user by ID: ${ err.message }`);
        next(err);
      });
  },
  update: (req, res, next) => {
    let user_id = req.params.id,
      userParams = {
        name: {
          last: req.body.last,
          first: req.body.first,
        },
        email: req.body.email,
        password: req.body.password,
        zip_code: req.body.zip_code,
      };
    User.findByIdAndUpdate(user_id, {
      $set: userParams
    })
    .then(user => {
      res.locals.redirect = `/users/${ user_id }`;
      res.locals.user = user;
      next();
    })
    .catch(err => {
      console.log(`Error updating user by ID: ${ err.message }`);
      next(err);
    });
  },
  delete: (req, res, next) => {
    let user_id = req.params.id;
    User.findByIdAndRemove(user_id)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch(err => {
        console.log(`Error deleting user by ID: ${ err.message }`);
        next;
      });
  },
  index: (req, res, next) => {
    User.find({})
      .then((users) => {
        res.locals.users = users;
        next();
      })
      .catch((err) => {
        console.log(`Error fetching users: ${ err.message }`);
        next(err);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  }
};