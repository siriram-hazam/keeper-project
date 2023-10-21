const User = require('../models/User')

module.exports = (req, res) => {
    User.create(req.body).then(() => {
        console.log("User Registered Successfully!")
        res.redirect('/')
    }).catch((error) => {
        // console.log(error.errors)
        if (error) {
            const valiadataionErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('validationErrors', valiadataionErrors)
            req.flash('data', req.body)
            return res.redirect('/register')
        }
    })
}