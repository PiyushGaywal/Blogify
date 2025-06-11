const User = require('../models/User');

exports.Showsignup = (req, res, next) => {
    res.render('Auth/signup', { message: null });
};

exports.Signup = async (req, res, next) => {
    const { email } = req.body;
    try {
        const euser = await User.findOne({ email });
        if (euser) {
            return res.render('Auth/signup', { message: 'User Already Exists. Please Login' });
        }
        const nuser = new User(req.body);
        await nuser.save();
        return res.redirect('/login'); 

    } catch (err) {
        return res.render('Auth/signup', { message: 'Server Error. Please try again.' });
    }
};

exports.Showlogin = (req, res, next) => {
    res.render('Auth/login', { message: null });
};

exports.Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.render('Auth/login', { message: 'Wrong Details Entered' });
        }

        req.session.user = user;
        return res.redirect('/');

    } catch (err) {
        return res.render('Auth/login', { message: 'Something went wrong' });
    }
};
