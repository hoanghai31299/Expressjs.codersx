const Transfer = require('../models/transfers.model')

module.exports.root = (req, res, next) => {
    res.render('transfer/transfer', {
        csruf: req.csrfToken()
    });
}
module.exports.postTransfer = async(req, res, next) => {
    let transfer = {
        account: req.body.account,
        amount: +req.body.amount,
        user: req.signedCookies.userId
    }
    await Transfer.create(transfer);
    res.redirect('/transfer')
}