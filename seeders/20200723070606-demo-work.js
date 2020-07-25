'use strict';

// const today = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Works', [{
      done_date: '2020/07/25',
      CategoryId: 1,
      done_hours: 1,
      note: '夕食　カレーライス',
      createdAt: new Date(2020, 7, 25),
      updatedAt: new Date(2020, 7, 25)
    }, {
      done_date: '2020/07/26',
      CategoryId: 2,
      done_hours: 0.5,
      note: 'お掃除ロボットなど',
      createdAt: new Date(2020, 7, 26),
      updatedAt: new Date(2020, 7, 26)
    }, {
      done_date: '2020/07/27',
      CategoryId: 3,
      done_hours: 1,
      note: 'スーパー、食料品',
      createdAt: new Date(2020, 7, 27),
      updatedAt: new Date(2020, 7, 27)
    }, {
      done_date: '2020/07/28',
      CategoryId: 4,
      done_hours: 1,
      note: '午前、公園お出かけ',
      createdAt: new Date(2020, 7, 28),
      updatedAt: new Date(2020, 7, 28)
    }, ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Works', null, {});
  }
};
