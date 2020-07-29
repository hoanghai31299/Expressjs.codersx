const express = require('express');
const route = express.Router();
const controller = require('../controllers/product.controller');

route.get('/', controller.get);

route.get('/search', controller.search);

module.exports = route;