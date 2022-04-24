'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'admin',
        description: 'Administrator'
      },
      {
        name: 'employee',
        description: 'Employee'
      }
    ]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
