const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let transferSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: Number,
    account: String,
})
let Transfer = mongoose.model('Transfer', transferSchema, 'transfers')
module.exports = Transfer;