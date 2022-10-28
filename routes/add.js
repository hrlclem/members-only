var express = require('express');
var router = express.Router();

/* GET users listing. */
/* MEMBERS ONLY*/
router.get('/', function(req, res, next) {
  res.render('add', { title: 'Add a new comment (ONLY IF MEMBER)' });
});

module.exports = router;
