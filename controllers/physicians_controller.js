var express = require('express');
var router = express.Router();
var tokenAuth = require('./auth.js');
var crypto = require('crypto');
var mime = require('mime');

//for image upload
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/profiles/physician/');
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload = multer({ storage: storage });

// including models
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

router.get('/register', function(req, res){
  res.render("physician-register");
  //renders the signup form handlebars view
  //clicking the submit button posts form data to `/physicians/create`
});

//add new physician profile
router.post(
  '/create', 
  upload.single('prof_pic'), 
  function (req, res, next) {
    console.log('file info: ', req.file);
    console.log(req.body.specialty);
    // Physician.create({
    //   first_name: req.body.first_name,
    //   last_name: req.body.last_name,
    //   address1: req.body.address1,
    //   address2: req.body.address2,
    //   city: req.body.city,
    //   state: req.body.state,
    //   zip: req.body.zip,
    //   phone_number: req.body.phone_number,
    //   specialty: req.body.specialty,
    //   prof_pic: req.files[0]
    // })
    // .then(function(newPhysician) {
      console.log('received');
      var newPhysician = {url_path: "howser1"};
      //res.redirect('/dr/' + newPhysician.url_path);
      res.redirect('/profiles/physician/' + req.file.filename);
    // });
  }
);

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
