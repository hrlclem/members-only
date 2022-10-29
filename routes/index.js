const express = require("express");
const router = express.Router();

// ----.com/----

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Homepage (See all comments)',
    user: req.user,
  });
});

module.exports = router;