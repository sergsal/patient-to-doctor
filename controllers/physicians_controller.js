var express = require('express');
var router = express.Router();
var tokenAuth = require('./auth.js');
var Physician = require('../models/')["Physician"];
var Availability = require('../models/')["Availability"];

//list of physicians
router.get('/', function(req, res) {
  Physician.findAll({})
  .then(function(physicians) {
    return res.render("physicians", {"physicians" : physicians});
  });
});

//physician profile page
router.get('/:urlpath', function(req, res) {
  
  Physician.findOne({
    where: {url_path : req.params.urlpath}
  })
  .then(function(physician){
     
    //return availabilities
    //return physician address
    //return physician contact info
    //return physician specialty

    return physician.getAvailabilities()
      .then(function(availabilities){
        return res.json({"availabilities" : availabilities});
      });
  });
});

//add new physician profile
router.post('/create', tokenAuth, function(req, res, next) {
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
router.put('/update', tokenAuth, function(req, res, next) {
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