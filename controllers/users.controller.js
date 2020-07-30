const md = require('md5');

const db = require('../db.js');
const shortid = require('shortid');


module.exports.root = (req, res) => {
    res.render('users/users.pug', {
        users: db.get('users').value()
    });
}
module.exports.search = (req, res) => {
    var keyWord = req.query.name
    let matchedUsersList = db.get('users').value().filter((u) => {
        return u.name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1;
    })
    res.render('users/users.pug', {
        users: matchedUsersList
    });
}
module.exports.getCreate = (req, res) => {
    res.render('users/create', {
        csruf: req.csrfToken()
    });
}
module.exports.create = (req, res) => {
    let newID = shortid.generate();
    let avatar = req.file.path.split('\\').slice(1).join('\\');
    db.get('users').push({ id: newID, name: req.body.name, phone: md(req.body.phone), avatar: avatar }).write();
    res.redirect('/users');
}
module.exports.view = (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    res.render('users/view.pug', {
        user: user
    })
}
module.exports.delete = (req, res) => {
    var id = req.params.id;
    db.get('users')
        .remove({ id: id })
        .write()
    res.redirect('/users');

}