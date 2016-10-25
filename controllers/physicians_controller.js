var express = require('express');
var router = express.Router();
var tokenAuth = require('./auth.js');
var Physician = require('../models/')["Physician"];
var Availability = require('../models/')["Availability"];

//list of physicians
router.get('/', function (req, res) {

  //Builds the where clause with any search params
  var whereClause = {};
  if(req.query.city) {
    console.log("req.query.city " + req.query.city);
    whereClause.city = req.query.city.trim();
  }
  if(req.query.specialty) {
    whereClause.specialty = req.query.specialty.toLowerCase().trim();
  }

  //Retrieves results
  Physician.findAll({where: whereClause})
    .then(function (physicians) {
      return res.render("physician-search", {
      "title": "View All Physicians",
      "path" : "/physician",
      "physicians": physicians
    });
  });
});

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

router.get('/register', function(req, res){
  //renders the signup form handlebars view
  //clicking the submit button posts form data to `/physicians/create`
});

//add new physician profile
router.post('/create', tokenAuth, function (req, res, next) {
 // first_name: 
 // last_name: 
 // address1: 
 // address2: 
 // city: 
 // state: 
 // zip: 
 // phone_number: 
 // specialty: 
 // url_path: 
});

//
router.put('/update', tokenAuth, function (req, res, next) {
 // first_name: 
 // last_name: 
 // address1: 
 // address2: 
 // city: 
 // state: 
 // zip: 
 // phone_number: 
 // specialty: 
 // url_path: 
});

module.exports = router;
