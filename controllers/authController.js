const User = require("../models/user")
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const passport = require("passport");


exports.user_login_get = (req,res) => {
    res.render('login_form', { title: 'Login page'});
};

exports.user_signup_get = (req,res) => {
    res.render('signup_form', { title: 'Sign-up page' });
};

exports.user_signup_post = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .escape(),
	body("password")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confPassword")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(async (value, { req }) => {
        if (value !== req.body.password) throw new Error('Passwords must be the same');
        return true;
      }),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("signup_form", { title: "Sign Up", passwordConfirmationError: "Passwords must be the same!" });
    }

    try {
      const isUserInDB = await User.find({ "username": req.body.username });
      if (isUserInDB.length > 0) return res.render("signup_form", { title: "Sign Up", error: "User already exists" });
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) return next(err);

        const user = new User({
          name: req.body.name,
          surname: req.body.surname,
          username: req.body.username,
          password: hashedPassword,
        });
        
        user.save(err => {
          if(err){
            res.redirect("/auth/sign-up")
            next(err)
          }
          else 
          {
            passport.authenticate('local')(req,res, function() {
              res.redirect('/users/profile'); 
            } )        
          }
      });
    })
    }
    catch (err) {
      return next(err);
    }
  }
];