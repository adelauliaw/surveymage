'use strict';
const users = require('../db/users.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    users.forEach(element => {
      delete element.id,
        element.createdAt = new Date()
      element.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Users', users, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
