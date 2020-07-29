const db = require('../db.js');

module.exports.get = (req, res) => {
    //so trang duoc chon
    var page = req.query.page || 1;
    // number product per page:
    var num = 9;
    //object de phan trang
    var previous = 3 * Math.floor((page - 1) / 3);
    var pagination = {
        previous: previous,
        middle: [previous + 1, previous + 2, previous + 3],
        next: previous + 4,
        page: page
    }
    res.render('products/product', {
        products: db.get('products').value().slice((page - 1) * num, page * num),
        pagination: pagination
    })
}

module.exports.search = (req, res, next) => {
    //so trang duoc chon
    var page = req.query.page || 1;
    // number product per page:
    var num = 9;
    //object de phan trang
    var previous = 3 * Math.floor((page - 1) / 3);
    var pagination = {
        previous: previous,
        middle: [previous + 1, previous + 2, previous + 3],
        next: previous + 4,
        page: page
    }
    let keyWord = req.query.search_name;
    let matchedProducts = db.get('products').value().filter(e => {
        return e.product_name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1
    })
    res.render('products/product', {
        matchedCount: matchedProducts.length,
        products: matchedProducts.slice((page - 1) * num, page * num),
        pagination: pagination
    })
}