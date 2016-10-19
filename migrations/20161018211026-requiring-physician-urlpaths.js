'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Physicians',
      'url_path',
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Physicians',
      'url_path',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  }
};
