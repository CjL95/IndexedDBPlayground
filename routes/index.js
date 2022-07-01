var express = require('express');
var router = express.Router();
//console.log(this.IDBDatabase.objectStoreNames);
/* GET home page */
router.get('/', function(req, res, next) {
	//console.log(req);
  res.render('index', { 
  	title: 'Simple Node Template',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgHome'
  });
  console.log(req);
});

module.exports = router;
