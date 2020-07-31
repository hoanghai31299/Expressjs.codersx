const Product = require('../models/products.model')

module.exports.get = async(req, res) => {
    //so trang duoc chon
    var currentPage = +req.query.page || 1,
        perPage = 9;
    const countPro = await Product.find().lean();
    const totalPage = countPro.length % perPage === 0 ? countPro.length / perpage : parseInt(countPro.length / perPage) + 1;
    var products = await Product.find().lean().limit(perPage).skip((currentPage - 1) * perPage);
    return res.render('products/product', {
        products: products,
        pages: totalPage,
        currentPage: currentPage,
        range: 4
    })
}

module.exports.search = async(req, res, next) => {
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
    let products = await Product.find();
    let matchedProducts = products.filter(e => {
        return e.product_name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1
    })
    res.render('products/product', {
        matchedCount: matchedProducts.length,
        products: matchedProducts.slice((page - 1) * num, page * num),
        pagination: pagination
    })
}