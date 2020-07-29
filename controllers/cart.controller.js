const db = require('../db')

module.exports.root = (req, res) => {
    let sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        res.redirect('/products');
        return;
    }
    var products = db.get('sessions').find({ id: sessionId }).get('cart').value();
    var arrProd = [];
    for (product in products) {
        db.get('products').find({ id: product }).value().quarity = products[product];
        arrProd.push(db.get('products').find({ id: product }).value());
    }
    res.render('cart/cart', {
        products: arrProd
    });
}
module.exports.add = (req, res) => {
    var prodId = req.params.prodId;
    //lay id cua session
    var session = req.signedCookies.sessionId;

    if (!session) {
        res.redirect('/products');
        return
    }
    var count = db.get('sessions')
        .find({ id: session })
        .get('cart.' + prodId, 0).value();
    db.get('sessions')
        .find({ id: session })
        .set('cart.' + prodId, count + 1).write();
    res.redirect('/cart');
}