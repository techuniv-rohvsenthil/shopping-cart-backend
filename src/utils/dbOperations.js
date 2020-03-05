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

const retrieveProductDetailsFromDB = async () => {
  const result = await db.products.findAll();
  return result;
};

const insertCartDetailsToDB = async (cartObj) => {
  await db.carts.create({
    item: cartObj.item,
    quantity: cartObj.item,
    price: cartObj.price,
  });
};

module.exports = { insertProductDetailsToDB, retrieveProductDetailsFromDB };
