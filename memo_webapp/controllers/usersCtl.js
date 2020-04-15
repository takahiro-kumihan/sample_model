"use strict";

const User = require("../models/user");

module.exports = {
  index: (req, res, next) => {
    User.find({})
      .then((users) => {
        res.locals.users = users;
        next();
      })
      .catch((err) => {
        console.log(`Error fetching users: ${err.message}`);
        next(err);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  },
  new: (req, res) => {
    res.render("users/new");
  },
  create: (req, res, next) => {
    let userParams = {
      name: {
        last: req.body.last,
        first: req.body.first,
      },
      email: req.body.email,
      password: req.body.password,
      zip_code: req.body.zipz_code,
    };
    User.create(userParams)
      .then((user) => {
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch((err) => {
        console.log(`Error saving user: ${err.message}`);
        next(err);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  }
};

// 上のコードは『locals』メソッドを使う場合。
// module.exports = {
//   index: (req, res) => {
//     User.find({})
//       .then(users => {
//         res.render("users/index", {
//           users: users
//         })
//       })
//       .catch(err => {
//         console.log(`Error fetching users: ${ err.message }`);
//         res.redirect("/");
//       });
//   }
// };