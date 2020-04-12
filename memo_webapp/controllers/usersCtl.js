const User = require("../models/user");

module.exports = {
  index: (req, res, next) => {
    User.find({})
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(err => {
        console.log(`Error fetching users: ${ err.message }`);
        res.redirect("/");
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
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