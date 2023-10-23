const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

//MongoDB Connection
mongoose.connect('mongodb://localhost:27017/project', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

global.loggedIn = null
global.UserData = null

// Controllers
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const addController = require('./controllers/addController')
const listController = require('./controllers/listController')
const deleteController = require('./controllers/deleteController')
const updateController = require('./controllers/updateController')

const storeUserController = require('./controllers/storeUserController')
const addContentController = require('./controllers/addContentController')
const deleteContentController = require('./controllers/deleteContentController')
const updateContentController = require('./controllers/updateContentController')

// Middleware
const redirectIfAuth = require('./middleware/redirectIfAuth')


app.use(express.static('public'))
app.use(express.json())
// app.use(express.urlencoded())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(flash())

app.use(expressSession({
    secret: "node secret"
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    UserData = req.session.userData
    next()
})


app.set('view engine', 'ejs')

app.get('/', indexController)
app.get('/login', redirectIfAuth, loginController)
app.get('/register', redirectIfAuth, registerController)
app.get('/logout', logoutController)
app.get('/admin/add', addController)
app.get('/admin/list', listController)
app.get('/admin/delete', deleteController)
app.get('/admin/update', updateController)

app.post('/users/register', redirectIfAuth, storeUserController)
app.post('/users/login', redirectIfAuth, loginUserController)
app.post('/admin/add/run', addContentController)
app.post('/admin/delete/run', deleteContentController)
app.post('/admin/update/run', updateContentController)

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})