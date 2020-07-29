const express = require('express')
const route = express.Router();
const controller = require('../controllers/users.controller');
const validate = require('../middlewares/validate.middleware');

const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' })



route.get('/', controller.root)

route.get('/search', controller.search)

route.post('/create', upload.single('avatar'), validate.checkCreate, controller.create)

route.get('/view/:id', controller.get)

route.get('/create', controller.getCreate)

module.exports = route;