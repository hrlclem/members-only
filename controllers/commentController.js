var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const validator = require("express-validator");
const User = require("../models/user")
const async = require("async");
const { param } = require("../routes");



exports.comment_list = (req,res) => {
    res.render('comment_list', { title: 'Comment list page' });
};


exports.comment_add_get = (req,res) => {   // MEMBER ONLY
    res.render('comment_form', { title: 'Comment form page' });
};

exports.comment_add_post = (req,res) => {
    res.render('comment_detail', { title: 'New comment added page' });
};

exports.comment_detail = (req,res) => {
    res.render('comment_detail', { title: 'Comment detail page' });
};

