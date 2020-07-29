const db = require('../db.js');
const shortId = require('shortid');

module.exports.root = (req, res, next) => {
    res.render('transfer/transfer', {
        csruf: req.csrfToken()
    });
}
module.exports.postTransfer = (req, res, next) => {
    let id = shortId.generate();
    let data = {
        id: id,
        account: req.body.account,
        amount: +req.body.amount,
        user: req.signedCookies.userId
    }
    db.get('transfers').push(data).write();
    res.render('transfer/transfer', {
        alert: "Success"
    })
}