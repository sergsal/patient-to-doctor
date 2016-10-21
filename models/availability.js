'use strict';
module.exports = function (sequelize, DataTypes) {
 var Availability = sequelize.define('Availability', {
  start: DataTypes.DATE,
  end: DataTypes.DATE,
  reserved: {
   type: DataTypes.BOOLEAN,
   defaultValue: false,
   allowNull: false
  }

 }, {
  classMethods: {
   associate: function (models) {
    Availability.belongsTo(models.Physician, {
      hooks: true,
      foreignKey: {
       allowNull: false
      }
     })
     // associations can be defined here
   }
  }
 });
 return Availability;
};
