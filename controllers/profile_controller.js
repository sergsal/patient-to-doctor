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
      "path" : "/physicians/:urlpath",
      "availabilities": availabilities,
      "physician": physician
     });
    });
  });
});

module.exports = router;
