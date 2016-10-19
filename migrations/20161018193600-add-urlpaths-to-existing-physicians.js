'use strict';
var Physician = require('../models')['Physician'];

module.exports = {
  up: function (queryInterface, Sequelize) {
    Physician.findAll({
        //select clause
        attributes: ['id', 'last_name'],
        //where clause
        where: { 
          url_path: null
        }
    }).then(function(physicians) {

      //loop through physicians,
      //and update each url_path with the concatenated result
      //of the physician's last name and id
      physicians.forEach(function(physician) {
        Physician.update(
          //set clause
          {
            url_path: physician.last_name + physician.id
          },
          //where clause
          {
            where: {
              id: physician.id,
              url_path: null
            }
          }
        );
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    Physician.update(
      //set clause
      {
        url_path: null
      },
      //where clause
      {
        where: {
          url_path: {
            $ne: null
          }
        }
      }
    );
  }
};
