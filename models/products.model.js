const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productSchema = new Schema({
    product_name: String,
    description: String,
    image: String,
    deleteAt: Date
})
let Product = mongoose.model('Product', productSchema, 'products')
module.exports = Product;