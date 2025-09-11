
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // This seeder will only run if we have at least one user
    const users = await queryInterface.sequelize.query(
      'SELECT id from users;'
    );
    
    const userId = users[0][0]?.id;
    
    if (userId) {
      return queryInterface.bulkInsert('categories', [
        { id: '1e3d6a9f-2b8c-4e7d-9f0a-1b2c3d4e5f6a', name: 'Food', userId, createdAt: new Date(), updatedAt: new Date() },
        { id: '2f4e7b0a-3c9d-5f8e-0a1b-2c3d4e5f6a7b', name: 'Transportation', userId, createdAt: new Date(), updatedAt: new Date() },
        { id: '3g5f8c1b-4d0e-6g9f-1b2c-3d4e5f6a7b8c', name: 'Entertainment', userId, createdAt: new Date(), updatedAt: new Date() },
        { id: '4h6g9d2c-5e1f-7h0g-2c3d-4e5f6a7b8c9d', name: 'Utilities', userId, createdAt: new Date(), updatedAt: new Date() },
        { id: '5i7h0e3d-6f2g-8i1h-3d4e-5f6a7b8c9d0e', name: 'Rent', userId, createdAt: new Date(), updatedAt: new Date() }
      ], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
