const db = require('../../models/index');

const insertProductDetailsToDB = async (prodObj) => {
  await db.products.create({
    prodId: prodObj.id,
    prodName: prodObj.name,
    prodPrice: prodObj.price,
    prodQuantity: prodObj.quantity,
    prodImage: prodObj.imageLink,
    prodCategory: prodObj.category,
  });
};

const isEmpty = async () => {
  const result = await db.products.findAll();
  if (result.length < 1) {
    return true;
  }
  return false;
};

module.exports = { insertProductDetailsToDB, isEmpty };
