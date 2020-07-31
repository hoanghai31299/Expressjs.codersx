const Session = require('../models/sessions.model')
const shortId = require('shortid')
module.exports = (req, res, next) => {
    if (!req.signedCookies.phienLamViec) {
        var newId = shortId.generate()
        Session.create({
            sessionId: newId
        })
        res.cookie('phienLamViec', newId, {
            signed: true
        });

    }
    next()
}