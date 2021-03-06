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

const updateProductDetails = async (item, newQuantity) => {
  const res = await db.products.findOne({
    where: {
      prodName: item,
    },
  });
  await db.products.update(
    { prodQuantity: res.dataValues.prodQuantity - newQuantity },
    { where: { prodName: item } },
  );
};

const removeAllFromCart = async () => {
  await db.carts.destroy({
    where: {},
    truncate: true,
  });
};

const insertCartDetailsToDB = async (cartObj) => {
  await db.carts.create({
    item: cartObj.item,
    quantity: cartObj.quantity,
    price: cartObj.price,
  });
};

const removeCartDetailFromDB = async (itemName) => {
  const res = await db.carts.findOne({
    where: {
      item: itemName,
    },
  });
  await db.carts.destroy({
    where: {
      id: res.id,
    },
  });
};

const retrieveCartDetailFromDB = async () => {
  const res = await db.carts.findAll();
  return res;
};

module.exports = {
  insertProductDetailsToDB,
  retrieveProductDetailsFromDB,
  insertCartDetailsToDB,
  removeCartDetailFromDB,
  retrieveCartDetailFromDB,
  updateProductDetails,
  removeAllFromCart,
};
