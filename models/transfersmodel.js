const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let transferSchema = new Schema({
    user: String,
    amount: Number,
    account: String,
})
let Transfer = mongoose.model('Transfer', userSchema, 'transfers')
module.exports = Transfer;