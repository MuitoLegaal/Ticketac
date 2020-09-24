var express = require('express');
var router = express.Router();
var userModel = require('../models/users');

/* GET users listing. */



/* GET logout page */
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/') });

module.exports = router;