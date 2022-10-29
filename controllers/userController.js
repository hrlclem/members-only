var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const validator = require("express-validator");
const User = require("../models/user")
const async = require("async");
const { param } = require("../routes");
var passport = require("passport");


exports.users_list = (req,res) => {
    res.render('user_list', { title: 'User list page' });
};

exports.user_add_get = (req,res) => {
    res.render('user_form', { title: 'User form page' });
};

exports.user_add_post = (req,res) => {
    res.render('user_detail', { title: 'New user page' });
};

exports.user_detail = (req,res) => {
    console.log(req.user)
    res.render('user_detail', { title: 'User profile page' });
};

