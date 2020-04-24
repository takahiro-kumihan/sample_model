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
  login: (req, res) => {
    res.render("users/login");
  },
  authenticate: (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          user.pwCompare(req.body.password)
            .then(pwMatch => {
              if (pwMatch) {
                res.locals.redirect = `/users/${ user._id }`;
                req.flash("success",
                  `${ user.fullName }さんがログインしました。`);
                res.locals.user = user;
              } else {
                req.flash("error", "パスワードが違います。");
                res.locals.redirect = "/users/login";
              }
              next();
            });
        } else {
          req.flash("error",
            "該当の会員が見つかりませんでした。");
          res.locals.redirect = "/users/login"
          next();
        }
      })
      .catch(err => {
        console.log(`Error logging in user: ${ err.message }`);
        next(error);
      });
  },
  validate: (req, res, next) => {
    // emailフィールドの不要なスペースを除去する。
    req.sanitaizeBody("email").normalizeEmail({ all_lowercase: true })
      .trim();
    req.check("email", "このメールアドレスは無効です。 ")
      .notEmpty()
      .isEmail();
    // zip_codeフィールドが空かどうかの検証。
    req.check("zip_code", "この番号は無効です。")
      .notEmpty()
      .isInt()
      .isLength({ min: 4, max: 4 })
      .equals(req.body.zip_code);
    req.check("password", "パスワードを入力してください。")
      .notEmpty();
    // 以上のバリデーションの結果を集め以下の処理をする。
    req.getValidateResult().then((err) => {
      if (!err.isEmpty()) {
        let messages = err.array().map(e => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/new";
        next();
      } else {
        next();
      }
    });
  },
  new: (req, res) => {
    res.render("users/new");
  },
  create: (req, res, next) => {
    let userParams = getUserParams(req.body);
    User.create(userParams)
      .then((user) => {
        req.flash("success",
          `${ user.fullName }さんのアカウントを作成しました。`);
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