'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [{
      name: '料理',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: '掃除',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: '買い物',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: '育児',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: '洗濯',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
