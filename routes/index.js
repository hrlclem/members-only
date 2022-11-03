const express = require("express");
const router = express.Router();
const async = require("async");
const Message = require("../models/message")
const User = require("../models/user");
const { render } = require("../app");

// ----.com/----
/* GET home page. */
router.get('/', async (req, res, next) => {
  console.log(req.user)
  try{
    const messages = await Message.find().sort([["date", "descending"]]).populate("user");
    return res.render('index', { title: 'The Comment Club', user: req.user, messages: messages});
  } catch (err) {
    return  next(err);
  }
});


module.exports = router;