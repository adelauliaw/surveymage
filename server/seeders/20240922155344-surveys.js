'use strict';
const surveys = require('../db/surveys.json');
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
    surveys.forEach(element => {
      delete element.id,
        element.createdAt = new Date()
      element.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Surveys', surveys, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Surveßys', null, {});
  }
};
