const md = require('md5')
const User = require('../models/users.model')

module.exports.login = (req, res) => {
    res.render('auth/login', {
        csruf: req.csrfToken()
    })
}
module.exports.postLogin = async(req, res) => {
    let user = await User.findOne({ name: req.body.name }).lean();
    if (!user) {
        err = ['User does not exist'];
        res.render('auth/login', {
            errors: err,
            csruf: req.csrfToken(),
            body: req.body
        })
        return;
    }
    if (!(user.phone == md(req.body.phone))) {
        err = ['Wrong password'];
        res.render('auth/login', {
            errors: err,
            csruf: req.csrfToken(),
            body: req.body
        })
        return;
    }
    res.cookie('userId', user._id, {
        signed: true
    })
    res.redirect('/users');
}