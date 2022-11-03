var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const validator = require("express-validator");
const User = require("../models/user")
const Message = require("../models/message")

const async = require("async");
const { param } = require("../routes");



exports.comment_list = (req,res) => {
    res.render('comment_list', { title: 'Comment list page' });
};


exports.comment_add_get = (req,res) => {   // MEMBER ONLY
    res.render('comment_form', { title: 'Comment form page' });
};

exports.comment_add_post = [
    body("messageTitle")
        .trim()
        .isLength({ min: 1 },{max: 30})
        .escape()
        .withMessage("Title is required"),
    body("messageText")
        .trim()
        .isLength({ min: 1 },{max: 300})
        .escape()
        .withMessage("Text is required"),

    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("user_detail", { title: "User profile page", user: req.user, errors: errors.array() });
      } 
      console.log("running and adding message")
      const message = new Message({
        user: req.user.id,
        title: req.body.messageTitle,
        content: req.body.messageText,
        date: Date.now(),
      })

      await message.save((err) =>{
        if(err) return next(err);
        res.redirect("/")
      })
    },
];

exports.comment_detail = (req,res) => {
    res.render('comment_detail', { title: 'Comment detail page' });
};

