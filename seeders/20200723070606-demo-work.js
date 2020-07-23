'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Works', [{
      done_date: '2020/07/23',
      CategoryId: 1,
      done_hours: 1,
      note: '夕食　カレーライス',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      done_date: '2020/07/23',
      CategoryId: 2,
      done_hours: 0.5,
      note: 'お掃除ロボットなど',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      done_date: '2020/07/23',
      CategoryId: 3,
      done_hours: 1,
      note: 'スーパー、食料品',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      done_date: '2020/07/23',
      CategoryId: 4,
      done_hours: 1,
      note: '午前、公園お出かけ',
      createdAt: new Date(),
      updatedAt: new Date()
    }, ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Works', null, {});
  }
};
