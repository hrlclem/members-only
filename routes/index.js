var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage (See all comments)' });
});

/* GET sign up. */
router.get('/sign-up', function(req, res, next) {
  res.render('sign-up', { title: 'Sign-up page' });
});

/* GET log in. */
router.get('/log-in', function(req, res, next) {
  res.render('log-in', { title: 'Log-in page' });
});

module.exports = router;
