var express = require('express');
var router = express.Router();
var tokenAuth = require('./auth.js');
var Physician = require('../models/')["Physician"];
var Availability = require('../models/')["Availability"];

//physician profile page
router.get('/:urlpath', function (req, res) {

	Physician.findOne({
			where: {
				url_path: req.params.urlpath
			}
		})
		.then(function (physician) {

			//return availabilities
			//return physician address
			//return physician contact info
			//return physician specialty

			return physician.getAvailabilities()
				.then(function (availabilities) {
					return res.render("physician-profile", {
						"title": physician.first_name + " " + physician.last_name,
						"path": "/physicians/:urlpath",
						"availabilities": availabilities,
						"physician": physician
					});
				});
		});
});

router.post('/:urlpath/availcreate', function (req, res) {
	console.log(req.body.start + "" + req.body.end);
	Availability.create({
			start: req.body.start,
			end: req.body.end,
			PhysicianId: req.body.physician_id
		})
		.then(function (){
		return res.redirect('/dr/'+req.params.urlpath);
	})
});

module.exports = router;