// require MODEL
const Contact = require("../models/contact");
// POST
exports.postContact = (req, res) => {
	res.render("contact_post");
};
// SAVE
exports.saveContact = (req, res) => {
	let newContact = new Contact({
		name: req.body.name,
		email: req.body.email,
		content: req.body.content
	});
	newContact.save()
		.then(ins => {
			res.render("contact_save", {
				Contact: ins
			});
		})
		.catch(error => {
			if (error) res.send(error);
		});
};
// GET
exports.getContact = (req, res) => {
	Contact.find({})
		.exec()
		.then(ins => {
			res.render("contact_get", {
				Contact: ins
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
