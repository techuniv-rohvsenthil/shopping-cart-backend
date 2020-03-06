
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    prodId: {
      type: Sequelize.INTEGER,
    },
    prodName: {
      type: Sequelize.STRING,
    },
    prodPrice: {
      type: Sequelize.DECIMAL,
    },
    prodQuantity: {
      type: Sequelize.INTEGER,
    },
    prodImage: {
      type: Sequelize.STRING,
    },
    prodCategory: {
      type: Sequelize.STRING,
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
  down: (queryInterface) => queryInterface.dropTable('products'),
};
