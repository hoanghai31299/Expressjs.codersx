const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    phone: String,
    avatar: String
})
let User = mongoose.model('User', userSchema, 'users')
module.exports = User;