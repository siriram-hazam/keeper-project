const User = require('../models/User')
const Content = require('../models/Contents')

module.exports = async (req, res) => {
    let UserData = await User.findById(req.session.userId)
    let ContentData = await Content.find({})
    res.render('index' ,{
        UserData,
        ContentData
    })
}