var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
 res.render("home", {});
});

router.get('/login', function (req, res) {

});

router.get("/patients", function(req, res){
	res.render("patient", {path:"/patients"});
});

module.exports = router;
