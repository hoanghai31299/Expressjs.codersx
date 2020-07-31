const express = require('express')
const route = express.Router();
const controller = require('../controllers/users.controller');
const validate = require('../middlewares/validate.middleware');

const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' })
const middlewareLogin = require('../middlewares/auth.middleware');

route.use(middlewareLogin.requireAuth);

route.get('/', controller.root)

route.get('/search', controller.search)

route.post('/create', upload.single('avatar'), validate.checkCreate, controller.create)

route.get('/view/:id', controller.view);

route.get('/create', controller.getCreate);

route.get('/delete/:id', controller.delete);

module.exports = route;