const Session = require('../models/sessions.model')
const shortId = require('shortid')
module.exports = async(req, res, next) => {
    if (!req.signedCookies.phienLamViec) {
        const createSession = await Session.create({});
        res.cookie('phienLamViec', createSession._id, {
            signed: true
        });
    }
    next()
}