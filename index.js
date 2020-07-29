//bien moi truong evironment valueables
require('dotenv').config();
//setup
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
const body = require('body-parser');
const csurf = require('csurf')

const cartRoute = require('./routes/cart.router')
const userRoute = require('./routes/user.router');
const authRoute = require('./routes/auth.router');
const prodRoute = require('./routes/product.router');
const transferRoute = require('./routes/transfer.router');


const sessionMiddleware = require('./middlewares/sessions.middleware')
const middlewareLogin = require('./middlewares/auth.middleware')

const port = 8080;
app.set('views', './views');
app.set('view engine', 'pug');
//setup de xem body cua request
app.use(express.json()) // for parsing application/json
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    //app.use(sessionMiddleware);
    //bat dau
app.get('/', (req, res) => {
    res.render('index.pug');
})
app.use(express.static('public'));
//them middleware protect voi token (csruf)
app.use(csurf({ cookie: true }))
app.use('/products', sessionMiddleware, prodRoute)
app.use('/auth', sessionMiddleware, authRoute)
app.use('/users', [sessionMiddleware, middlewareLogin.requireAuth], userRoute);
app.use('/cart', sessionMiddleware, cartRoute)
app.use('/transfer', middlewareLogin.requireAuth, transferRoute)
app.listen(port, () => {
    console.log(`da mo khoa con localhost:${port}`);
})