var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const validator = require("express-validator");
const User = require("../models/user")
const { param } = require("../routes");
var passport = require("passport");


exports.user_login_get = (req,res) => {
    res.render('login_form', { title: 'Login page' });
};

exports.user_login_post = passport.authenticate("local", {
    successRedirect: "/auth/signup"}), 
    function(req, res){
      res.redirect('/auth/nologin')
    };

exports.user_signup_get = (req,res) => {
    res.render('signup_form', { title: 'Sign-up page' });
};

exports.user_signup_post = (req,res) => {
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
    });
      user.save(err => {
        if (err) { 
          return next(err);
        }
        res.redirect(user.url);
      })
};


exports.user_logout_get = (req,res) => {
    req.logout();
    res.redirect("/");
};
