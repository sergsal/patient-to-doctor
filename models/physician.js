'use strict';
module.exports = function (sequelize, DataTypes) {
 var Physician = sequelize.define('Physician', {
  first_name: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  last_name: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  address1: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  address2: {
   type: DataTypes.STRING,
   allowNull: true,
  },
  city: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  state: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  zip: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  phone_number: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  specialty: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  url_path: {
   type: DataTypes.STRING,
   allowNull: false,
  }
 }, {
  classMethods: {
   associate: function (models) {
    Physician.hasMany(models.Availability, {
     hooks: true,
     onDelete: "CASCADE",
     foreignKey: {
      allowNull: true
     }
    })
   }
  }
 });
 return Physician;
};
