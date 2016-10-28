var express = require('express');
var router = express.Router();
var tokenAuth = require('./auth.js');

//for image upload
var crypto = require('crypto');
var mime = require('mime');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/profiles/physician/');
  },
  //randomizing filename
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

/**
 * Route: `/physicians/register`
 * Renders the handlebars view for the signup form.
 * Clicking the submit button posts form data to `/physicians/create`
 */
router.get('/register', function(req, res){
  res.render("physician-register");
});


/**
 * Route: `/physicians/create`
 * Handles image upload and creates new physician profile
 */
router.post(
  '/create', 
  upload.single('dr_prof_pic'), 
  function (req, res, next) {

    Physician.create({
      first_name: req.body.dr_first_name,
      last_name: req.body.dr_last_name,
      address1: req.body.dr_address1,
      address2: req.body.dr_address2,
      city: req.body.dr_city,
      state: req.body.dr_state,
      zip: req.body.dr_zip,
      phone_number: req.body.dr_phone_number,
      specialty: req.body.dr_specialty,
      prof_pic: req.file.filename
    })
    .then(function(newPhysician) {
      console.log("updating physician..");
      return Physician.update(
        //set clause
        {
          url_path: newPhysician.last_name.toLowerCase() + newPhysician.id
        },
        //where clause
        {
          where: {
            id: newPhysician.id
          }
        }
      );
    }).then(function(updatedPhysician) {
      console.log("redirecting..");
      res.redirect('/dr/' + updatedPhysician.url_path);
    });
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
