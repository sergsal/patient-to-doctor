var express = require('express');
var router = express.Router();
var Physician = require('../models/')["Physician"];
var Availability = require('../models/')["Availability"];

router.get('/physician', function(req, res) {
	Physician.findAll({})
	.then(function(physicians) {
		return res.json({"physicians" : physicians});
	});
});

module.exports = router;