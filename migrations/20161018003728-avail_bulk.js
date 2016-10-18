'use strict';

var Availabilitys = require('../models')['Availability'];

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   Availabilitys.bulkCreate([{
    start: "2016-10-17T19:40:16-05:00",
    end: "2016-10-17T19:49:16-05:00",
   }])
  },

  down: function (queryInterface, Sequelize) {
   return Availabilitys.destroy({where:{ start:
      [
        "2016-10-17T19:40:16-05:00"
      ]
    }})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
