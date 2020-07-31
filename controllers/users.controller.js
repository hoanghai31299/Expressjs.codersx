const User = require('../models/users.model');
const md = require('md5');

module.exports.root = async(req, res) => {
    let users = await User.find().lean();
    res.render('users/index', {
        users: users
    });
}
module.exports.search = async(req, res) => {
    var keyWord = req.query.name;
    let users = await User.find().lean();
    let matchedUsersList = users.filter((u) => {
        return u.name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1;
    })
    res.render('users/index', {
        users: matchedUsersList
    });
}
module.exports.getCreate = (req, res) => {
    res.render('users/create', {
        csruf: req.csrfToken()
    });
}
module.exports.create = async(req, res) => {
    let avatar = req.file.path.split('\\').slice(1).join('\\');
    await User.create({
        name: req.body.name,
        phone: md(req.body.phone),
        avatar: avatar
    })
    res.redirect('/users');
}
module.exports.view = async(req, res) => {
    var id = req.params.id;
    var user = await User.findById(id).lean();
    res.render('users/view.pug', {
        user: user
    })
}
module.exports.delete = async(req, res) => {
    var id = req.params.id;
    await User.deleteOne({ _id: id })
    res.redirect('/users');
}