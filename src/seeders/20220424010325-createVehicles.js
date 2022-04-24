'use strict';
// brand, model, year, km, color, chassis, sale_price, cost_price
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('vehicles', [
      {
        brand: "Chevrolet",
        model: "Onyx",
        year: 2020,
        km: "20000",
        color: "Blue",
        chassis: "0101",
        sale_price: 50000,
        cost_price: 20000
      },
      {
        brand: "Fiat",
        model: "Uno",
        year: 2009,
        km: "27500",
        color: "white",
        chassis: "0202",
        sale_price: 12000,
        cost_price: 5000
      },
      {
        brand: "Volkswagen",
        model: "Gol",
        year: 2016,
        km: "13765",
        color: "red",
        chassis: "0303",
        sale_price: 50000,
        cost_price: 22000
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vehicles', null, {});
  }
};
