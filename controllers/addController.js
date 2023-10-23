
const User = require('../models/User')

module.exports = async (req, res) => {

   

    let UserData = await User.findById(req.session.userId)
    
    try{
        if (UserData.roles === "admin") {
            res.render('admin_add', {
                UserData,
                // errors: req.flash('validationErrors'),
                // title: title,
                // description: description
            })
        } else {
            res.redirect('/');
        }    
    } catch (error) {
        console.error(error);
        res.redirect('/'); // Redirect to the home page in case of an error.
    }

}
