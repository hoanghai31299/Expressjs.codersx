const Session = require('../models/sessions.model')
const Product = require('../models/products.model')
const db = require('../db')
module.exports.root = async(req, res) => {
    let sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        res.redirect('/products');
        return;
    }
    var products = await Session.findById(sessionId).cart;
    var arrProd = [];
    for (product in products) {
        var pr = db.get('products').find({ id: product }).value()
        pr.quarity = products[product];
        arrProd.push(pr);
    }
    res.render('cart/cart', {
        products: arrProd
    });
}
module.exports.add = async(req, res) => {
    var prodId = req.params.prodId;
    //lay id cua session
    var session = req.signedCookies.sessionId;

    if (!session) {
        res.redirect('/products');
        return
    }
    var count = Session.findById(session).cart.prodId;
    db.get('sessions')
        .find({ id: session })
        .set('cart.' + prodId, count + 1).write();
    res.redirect('/cart');
}