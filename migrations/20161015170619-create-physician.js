'use strict';

var Physicians = require('../models')['Physician'];

module.exports = {
 up: function (queryInterface, Sequelize) {
  return queryInterface.createTable('Physicians', {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
   },
   first_name: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   last_name: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   address1: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   address2: {
    type: Sequelize.STRING,
    allowNull: true,
   },
   city: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   state: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   zip: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   phone_number: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   specialty: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   createdAt: {
    allowNull: false,
    type: Sequelize.DATE
   },
   prof_pic: {
    type: Sequelize.STRING,
    allowNull: true
   },
   updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
   }
  })
  .then(function(){
   Physicians.bulkCreate([
     {
      first_name: "Doogie",
      last_name: "Howser",
      address1: "742 Evergreen Terrace",
      city: "Springfield",
      state: "MO",
      zip: "12345",
      phone_number: "1234567890",
      specialty: "Cardiology",
      prof_pic: "howser.jpg"
     },
     {
      first_name: "John",
      last_name: "Dorian",
      address1: "Sacred Heart",
      city: "San DiFrangeles",
      state: "CA",
      zip: "23456",
      phone_number: "987654321",
      specialty: "General",
      prof_pic: "JD.jpg"
     }
   ])
  });
 },
 down: function (queryInterface, Sequelize) {
  return queryInterface.dropTable('Physicians');
 }
};
