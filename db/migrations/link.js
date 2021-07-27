module.exports = {
  /**
   * @param { import('sequelize').QueryInterface} queryInterface
   * @param { import('sequelize') } Sequelize
   */
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      linkable_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('links');
  },
};
