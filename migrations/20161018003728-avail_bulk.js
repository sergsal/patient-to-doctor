'use strict';

var Availabilities = require('../models')['Availability'];
var sequelize = require('../models')['sequelize'];

module.exports = {
  up: function (queryInterface, Sequelize) {
   return Availabilities.bulkCreate([{
    start: "2016-10-17T19:40:16-05:00",
    end: "2016-10-17T19:49:16-05:00",
    PhysicianId: 2
   },
   {
    start: "2016-10-18T19:40:16-05:00",
    end: "2016-10-18T19:49:16-05:00",
    PhysicianId: 2
   },
   {
    start: "2016-10-19T19:40:16-05:00",
    end: "2016-10-19T19:49:16-05:00",
    PhysicianId: 1
   }]);
  },

  down: function (queryInterface, Sequelize) {
    return Availabilities.destroy({
      where: {
        PhysicianId: [2, 1]
      }
    }).then(function() {
      return sequelize.query('ALTER TABLE Availabilities AUTO_INCREMENT=1');
    });
  }
};
