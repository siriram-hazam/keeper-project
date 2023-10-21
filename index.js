const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

//MongoDB Connection
mongoose.connect('mongodb://localhost:27017/project', { 
    useNewUrlParser: true
})

global.loggedIn = null

// Controllers
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const homeController = require('./controllers/homeController')

// Middleware
const redirectIfAuth = require('./middleware/redirectIfAuth')


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret: "node secret"
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})

app.set('view engine', 'ejs')

app.get('/', indexController)
app.get('/login', redirectIfAuth, loginController)
app.get('/register', redirectIfAuth, registerController)
app.post('/users/register', redirectIfAuth, storeUserController)
app.post('/users/login', redirectIfAuth, loginUserController)
app.get('/logout', logoutController)

app.listen(3000, () => {
    console.log('Server listening on port 3000')
});