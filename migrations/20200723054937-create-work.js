'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Works', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      done_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      CategoryId: {
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      done_hours: {
        allowNull: false,
        type: Sequelize.REAL
      },
      note: {
        type: Sequelize.STRING(30)
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Works');
  }
};