const User = require("../models/user")
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");


exports.user_login_get = (req,res) => {
    res.render('login_form', { title: 'Login page'});
};

exports.user_signup_get = (req,res) => {
    res.render('signup_form', { title: 'Sign-up page' });
};

exports.user_signup_post = (req,res) => {
  if (User.find({"username" : req.body.username }).length > 0) {
    return res.render("signup_form", {title:'Sign up, username already exists'})
  } else {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if(err) return next(err);
      const user = new User({
          name: req.body.name,
          surname: req.body.surname,
          username: req.body.username,
          password: hashedPassword,
      }).save((err) => {
          if (err) { 
            return next(err);
          }
          res.redirect('/');
        })
    })
  }
};
