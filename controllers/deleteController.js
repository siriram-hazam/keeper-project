const User = require('../models/User')
const Content = require('../models/Contents')

module.exports = async (req, res) => {

    let UserData = await User.findById(req.session.userId)
    let ContentData = await Content.find({})

    try{
        if (UserData.roles === "admin") {
            res.render('admin_delete', {
                UserData,
                ContentData
            })
        } else {
            res.redirect('/');
        }    
    } catch (error) {
        console.error(error);
        res.redirect('/'); // Redirect to the home page in case of an error.
    }

    // console.log(ContentData);

}