'use strict';
module.exports = {
 up: function (queryInterface, Sequelize) {
  return queryInterface.createTable('Availabilities', {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
   },
   start: {
    type: Sequelize.DATE
   },
   end: {
    type: Sequelize.DATE
   },
   reserved: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
   },
   createdAt: {
    allowNull: false,
    type: Sequelize.DATE
   },
   updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
   }
  });
 },
 down: function (queryInterface, Sequelize) {
  return queryInterface.dropTable('Availabilities');
 }
};
