var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
 res.render("home", {title: "Accessible Care"});
});

router.get('/login', function (req, res) {

});

router.get("/patients", function(req, res){
	res.render("patient", {path:"/patients", title: "For Patients"});
});

module.exports = router;
