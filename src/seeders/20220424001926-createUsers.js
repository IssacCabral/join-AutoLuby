'use strict';

const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync('123456', salt)

    const adminRoleId = await queryInterface.rawSelect('roles', {
      where: {
        name: 'admin'
      }
    }, ['id'])

    const employeeRoleId = await queryInterface.rawSelect('roles', {
      where: {
        name: 'employee'
      }
    }, ['id'])

    //Seed to generate users
    await queryInterface.bulkInsert('users', [
      {
        name: 'Aristóteles Ferreira',
        email: 'aristoteles@email.com',
        password: hash,
        roleId: adminRoleId,
        cpf: '11111',
        biography: 'Software Enginner',
        value: 1000000,
      },
      {
        name: 'Charles Chaplin',
        email: 'chaplin@email.com',
        password: hash,
        roleId: employeeRoleId,
        cpf: '22222',
        biography: 'Dev',
        value: 10000,
      },
      {
        name: 'Santos Dumont',
        email: 'dumont@email.com',
        password: hash,
        roleId: employeeRoleId,
        cpf: '33333',
        biography: 'Dev',
        value: 10000,
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
