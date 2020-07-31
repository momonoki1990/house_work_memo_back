'use strict';

// const today = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Works', [{
      done_date: '2020/06/25',
      CategoryId: 5,
      done_hours: 0.5,
      note: '布団　シーツ替え',
      createdAt: new Date(2020, 6, 25),
      updatedAt: new Date(2020, 6, 25)
    }, {
      done_date: '2020/06/25',
      CategoryId: 1,
      done_hours: 1,
      note: '夕食　冷やし中華',
      createdAt: new Date(2020, 6, 25),
      updatedAt: new Date(2020, 6, 25)
    }, {
      done_date: '2020/06/25',
      CategoryId: 3,
      done_hours: 1,
      note: '今週の食材',
      createdAt: new Date(2020, 7, 25),
      updatedAt: new Date(2020, 7, 25)
    }, {
      done_date: '2020/07/24',
      CategoryId: 1,
      done_hours: 1,
      note: '夕食　トマトスープ',
      createdAt: new Date(2020, 7, 24),
      updatedAt: new Date(2020, 7, 24)
    }, {
      done_date: '2020/07/24',
      CategoryId: 1,
      done_hours: 1,
      note: '朝食　手作りピザ',
      createdAt: new Date(2020, 7, 24),
      updatedAt: new Date(2020, 7, 24)
    }, {
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
      CategoryId: 1,
      done_hours: 1,
      note: '朝食、バナナジュース',
      createdAt: new Date(2020, 7, 28),
      updatedAt: new Date(2020, 7, 28)
    }, {
      done_date: '2020/07/28',
      CategoryId: 4,
      done_hours: 1,
      note: '午前、公園お出かけ',
      createdAt: new Date(2020, 7, 28),
      updatedAt: new Date(2020, 7, 28)
    }, {
      done_date: '2020/07/28',
      CategoryId: 1,
      done_hours: 1,
      note: '夕食、ハヤシライス',
      createdAt: new Date(2020, 7, 28),
      updatedAt: new Date(2020, 7, 28)
    }, {
      done_date: '2020/08/01',
      CategoryId: 1,
      done_hours: 1,
      note: '朝ごはん　パンケーキ',
      createdAt: new Date(2020, 8, 1),
      updatedAt: new Date(2020, 8, 1)
    }, {
      done_date: '2020/08/01',
      CategoryId: 1,
      done_hours: 1,
      note: '夕食　餃子',
      createdAt: new Date(2020, 8, 1),
      updatedAt: new Date(2020, 8, 1)
    }, {
      done_date: '2020/08/1',
      CategoryId: 2,
      done_hours: 1,
      note: '物置片付け',
      createdAt: new Date(2020, 8, 1),
      updatedAt: new Date(2020, 8, 1)
    }, ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Works', null, {});
  }
};
