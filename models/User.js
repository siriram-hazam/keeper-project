const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    roles: {
        type: String,
        // required: [true, 'Type is required']
    }
})

UserSchema.pre('save', function(next) {
    const user = this
    const roles = 'user'
    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
        user.roles = roles
        next()
    }).catch(error => {
        console.error(error)
    })
    
})

const User = mongoose.model('users', UserSchema)
module.exports = User