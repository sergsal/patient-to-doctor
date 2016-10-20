var tokenAuth = function(req, res, next) {
	return next();
};

module.exports = tokenAuth;

// from Dwight:
//--------------
// var ObjectID = require('mongodb').ObjectID;
// var jwt = require('jwt-simple');
// var User = require('../../lib/models/user');
// var jwtConfig = require('../../appconfig.js').config.jwt;
// var tokenAuth = function(req, res, next) {
//   var token = req.headers["x-access-token"];
//   if (token) {
//     var decoded = jwt.decode(token, jwtConfig.secret);
//     var accttype = decoded.accttype;
//     if (decoded.exp <= Date.now()) {
//       return res.end('Access token has expired', 400);
//     }
//     var _id = ObjectID(decoded.iss);
//     User.findById(_id, function(err, user) {
//       if(!user) {
//         return next();
//       }
//       delete user.password;
//       if (!err) {
//         req.currentUser = user;
//         return next();
//       } else {
//         return next(err);
//       }
//     });
//   } else {
//     res.end('No access token', 400);
//   }
// };

// module.exports = tokenAuth;