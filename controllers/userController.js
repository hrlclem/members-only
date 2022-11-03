var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const validator = require("express-validator");
const User = require("../models/user")
const Message = require("../models/message")
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

exports.user_detail = async (req, res, next) => {

    console.log(req.user)
    try{
      const messages = await Message.find().sort([["date", "descending"]]).populate("user");
      console.log(messages)
      return res.render('user_detail', { title: 'User profile page', user: req.user, messages: messages});
    } catch (err) {
      return  next(err);
    }
};

exports.add_premium_get = (req,res) => {
    res.render('add_premium', { title: 'Enter the password to become a premium member!', user: req.user });
};

exports.add_premium_post = [
    body("passcode").trim().isLength({ min: 1 }).escape().withMessage("Passcode must be specified."),

    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("add_premium", { title: "Enter the password to become a premium member!", user: req.user, errors: errors.array() });
      } else if (req.body.passcode != process.env.ADMIN_PASSCODE) {
        return res.render("add_premium", { title: "Enter the password to become a premium member!", user: req.user, passcodeError: "Wrong Passcode! Try again" });
      }
      const user = new User(req.user);
      user.memberStatus = true;

      await User.findByIdAndUpdate(user.id, user, {}, (err) => {
        if (err) return next(err);
        return res.redirect("/");
      }).clone();
    },
  ];