const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let sessionSchema = new Schema({
    sessionId: String,
    user: String,
    cart: Object
}, {
    versionKey: false // You should be aware of the outcome after set to false
})
let Session = mongoose.model('Session', sessionSchema, 'sessions')
module.exports = Session;