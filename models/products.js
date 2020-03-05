'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    prodId: DataTypes.INTEGER,
    prodName: DataTypes.STRING,
    prodPrice: DataTypes.DECIMAL,
    prodQuantity: DataTypes.INTEGER,
    prodImage: DataTypes.STRING,
    prodCategory: DataTypes.STRING
  }, {});
  products.associate = function(models) {
    // associations can be defined here
  };
  return products;
};