const express = require('express')
const route = express.Router();
const controller = require('../controllers/transfer.controller');

route.get('/', controller.root);
route.post('/create', controller.postTransfer);

module.exports = route;