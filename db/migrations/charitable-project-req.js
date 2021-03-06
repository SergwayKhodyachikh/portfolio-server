module.exports = {
  /**
   * @param { import('sequelize').QueryInterface} queryInterface
   * @param { import('sequelize') } Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    return queryInterface.createTable('charitable_project_reqs', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      about: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      web_address: {
        type: Sequelize.STRING,
      },
      tasks: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      reed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        defaultValue: Sequelize.literal('now()'),
        type: Sequelize.DATE,
      },
      updated_at: {
        defaultValue: Sequelize.literal('now()'),
        type: Sequelize.DATE,
      },
    });
  },
  /**
   * @param { import('sequelize').QueryInterface} queryInterface
   */
  down: queryInterface => {
    return queryInterface.dropTable('charitable_project_reqs');
  },
};
