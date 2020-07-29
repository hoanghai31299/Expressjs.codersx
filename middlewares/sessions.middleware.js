const shortId = require('shortid');
const db = require('../db');

module.exports = (req, res, next) => {

    if (!req.signedCookies.sessionId) {
        var newId = shortId.generate();
        res.cookie('sessionId', newId, {
            signed: true
        });
        db.get('sessions').push({
            id: newId
        }).write();
    }
    next()
}