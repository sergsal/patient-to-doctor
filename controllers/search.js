var express = require('express');
var router = express.Router();
var Physician = require('../models/')["Physician"];
var Availability = require('../models/')["Availability"];

router.get('/physicians', function(req, res) {
	// req.query.city = ;
	// req.query.specialty = 
	// req.query.name = ;

	//returns physicians according to search query, rendered as links to physician profiles
});

module.exports = router;