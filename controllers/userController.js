var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const validator = require("express-validator");
const User = require("../models/user")
const async = require("async");
const { param } = require("../routes");


exports.users_list = (req,res) => {
    res.render('user_list', { title: 'User list page' });
};;

exports.user_add_get = (req,res) => {
    res.render('user_form', { title: 'User form page' });
};;

exports.user_add_post = (req,res) => {
    res.render('user_detail', { title: 'New user page' });
};;

exports.user_login_get = (req,res) => {
    res.render('login_form', { title: 'Login page' });
};;

exports.user_login_post = (req,res) => {
    res.render('user_detail', { title: 'Logged page' });
};;

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
    console.log(user.url)

      user.save(err => {
        if (err) { 
          return next(err);
        }
        res.redirect(user.url);
      })

    console.log(user)
};

exports.user_detail = (req,res) => {
    res.render('user_detail', { title: 'User profile page' });
};

