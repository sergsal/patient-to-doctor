'use strict';

var sequelize = require('../models').sequelize;

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      {
        tableName: 'Physicians',
      },
      'url_path',
      {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    sequelize.query('ALTER TABLE `Physicians` DROP INDEX `url_path`');
    return queryInterface.removeColumn('Physicians', 'url_path');
  }
};
