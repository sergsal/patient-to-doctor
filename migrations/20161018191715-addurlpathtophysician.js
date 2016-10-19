'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
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
    queryInterface.removeColumn(
      {
        tableName: 'Physicians',
      },
      'url_path'
    );

  }
};
