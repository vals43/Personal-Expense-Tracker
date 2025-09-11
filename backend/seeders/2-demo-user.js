
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    return queryInterface.bulkInsert('users', [{
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      email: 'demo@example.com',
      password: hashedPassword,
      firstName: 'Demo',
      lastName: 'User',
      currency: 'USD',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
