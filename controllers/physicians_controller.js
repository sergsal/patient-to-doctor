var express = require('express');
var router = express.Router();
var tokenAuth = require('./auth.js');

//For image upload
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

// Including models
var Physician = require('../models/')["Physician"];
var Availability = require('../models/')["Availability"];

/**
 * GET Route: `/physicians`
 * Returns list of physicians according to parameters
 * in a search query.
 */
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
      "path" : "/physicians",
      "physicians": physicians
    });
  });
});

/**
 * GET Route: `/physicians/register`
 * Renders the handlebars view for the signup form.
 * Clicking the submit button posts form data to `/physicians/create`
 */
router.get('/register', function(req, res){
  res.render("physician-register", {
    title: "For Physicians",
    path : '/physicians/register'
  });
});


/**
 * POST Route: `/physicians/create`
 * Handles image upload,
 * parses input (redirecting back to form on invalid input) 
 * and creates new physician profile.
 */
router.post(
  '/create', 
  upload.single('dr_prof_pic'),
  redirectOnBadInput, 
  function (req, res, next) {
    var insertObject = {};

    //Adding required params
    insertObject.first_name = req.body.dr_first_name;
    insertObject.last_name = req.body.dr_last_name;
    insertObject.email = req.body.email;
    insertObject.address1 = req.body.dr_address1;
    insertObject.city =  req.body.dr_city;
    insertObject.state = req.body.dr_state;
    insertObject.zip = req.body.dr_zip;
    insertObject.phone_number = req.body.dr_phone;
    insertObject.specialty = req.body.dr_specialty;

    //Adding optional params
    if(req.body.dr_address2) {
      insertObject.address2 = req.body.dr_address2;
    }
    if(req.file) {
      insertObject.prof_pic = req.file.filename;
    }

    //Create new Physician entity
    Physician.create(insertObject)
    .then(function(newPhysician) {
      //Update Physician with URL path for profile page.
      return newPhysician.updateAttributes({
          url_path: newPhysician.last_name.toLowerCase() + newPhysician.id
      })
      //Redirect to profile page.
      .then(function(updatedPhysician) {
        console.log("redirecting to /dr/"+ updatedPhysician.url_path + "..");
        return res.redirect('/dr/' + updatedPhysician.url_path);
      });
    });
  }
);

/**
 * Middleware that verifies valid form submission. Upon error, it will 
 * redirect back to registration page with error in query url.
 */
function redirectOnBadInput(req, res, next) {
  var path = "";

  if(!req.body.dr_first_name) {
    path += "&missing[]=first%20name";
  }
  if(!req.body.dr_last_name) {
    path += "&missing[]=last%20name";
  }
  if(!req.body.dr_address1) {
    path += "&missing[]=address%20line%201";
  }
  if(!req.body.dr_city) {
    path += "&missing[]=city";
  }
  if(!req.body.dr_state) {
    path += "&missing[]=state";
  }
  if(!req.body.dr_zip) {
    path += "&missing[]=zip%20code";
  }
  if(!req.body.dr_phone) {
    path += "&missing[]=phone%20number";
  }
  if(!req.body.dr_specialty) {
    path += "&missing[]=specialty";
  }

  //Redirect back to form registration
  if(path.length !== 0) {
    return res.redirect('/physicians/register?error=true' + path);
  }
  else {
    return next();
  }
}

//
//router.put('/availupdate', tokenAuth, function (req, res, next) {
//
//console.log(req.body.start +""+req.body.end);
//res.redirect('/')
//});

module.exports = router;
