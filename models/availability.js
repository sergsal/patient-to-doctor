'use strict';
module.exports = function(sequelize, DataTypes) {
  var Availability = sequelize.define('Availability', {
    start: DataTypes.DATE,
    end: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
       Availability.belongsTo(models.Physician, {
        hooks: true,
        foreign: {
         allowNull: false
        }
       })
        // associations can be defined here
      }
    }
  });
  return Availability;
};