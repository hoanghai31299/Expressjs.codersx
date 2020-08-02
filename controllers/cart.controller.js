const Session = require('../models/sessions.model');
const Product = require('../models/products.model');

module.exports.root = async(req, res) => {
    let sessionId = req.signedCookies.phienLamViec;
    const session = await Session.findById(sessionId).lean();
    let products = session.cart || {};
    var arrProd = [];
    for (product in products) {
        let pr = await Product.findById(product);
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
    var sessionId = req.signedCookies.phienLamViec;
    const session = await Session.findById(sessionId).lean();
    session.cart = session.cart || {};
    let count = await session.cart[prodId] || 0;
    session.cart[prodId] = count + 1;
    await Session.updateOne({ _id: session._id }, session);
    res.redirect('/cart');
}