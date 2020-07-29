const express = require('express')
const route = express.Router();

const controller = require('../controllers/cart.controller');

route.get('/', controller.root);

route.get('/add/:prodId', controller.add);
module.exports = route;