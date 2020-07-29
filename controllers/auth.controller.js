const md = require('md5')
const db = require('../db.js')

module.exports.login = (req, res) => {
    res.render('auth/login')
}
module.exports.postLogin = (req, res) => {
    var user = db.get('users').find({ name: req.body.name }).value();
    if (!user) {
        err = ['User does not exist'];
        res.render('auth/login', {
            errors: err,
            body: req.body
        })
        return;
    }
    if (!(user.phone == md(req.body.phone))) {
        err = ['Wrong password'];
        res.render('auth/login', {
            errors: err,
            body: req.body
        })
        return;
    }
    res.cookie('userId', user.id, {
        signed: true
    })
    res.redirect('/users');
}