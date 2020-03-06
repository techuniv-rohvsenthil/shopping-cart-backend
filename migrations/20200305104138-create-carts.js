
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('carts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    item: {
      type: Sequelize.STRING,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    price: {
      type: Sequelize.DECIMAL,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('carts'),
};
