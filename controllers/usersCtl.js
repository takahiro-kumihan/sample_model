// require MODEL
const User = require("../models/user");
// POST
exports.postUser = (req, res) => {
	res.render("user_post");
};
// SAVE
exports.saveUser = (req, res) => {
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		c_code: req.body.c_code
	});
	newUser.save()
		.then(ins => {
			res.render("user_save", {
				User: ins
			});
		})
		.catch(error => {
			if (error) res.send(error);
		});
};
// GET
exports.getUser = (req, res) => {
	User.find({})
		.exec()
		.then(ins => {
			res.render("user_gets", {
				User: ins
			});
		})
		.catch(error => {
			console.log(error.message);
			return[];
		})
		.then( () => {
			console.log("Promiseが完了。")
		});
};
