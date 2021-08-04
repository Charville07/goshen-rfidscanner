var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bridgette Tapping', name: 'Bridgette' });
});

module.exports = router;
