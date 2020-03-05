const dbOperations = require('../utils/dbOperations');

const checkoutCart = async (request, h) => {
  try {
    // const itemDetails = request.payload;
    const res = await dbOperations.retrieveCartDetailFromDB();
    await dbOperations.removeAllFromCart();
    const items = {};
    res.forEach((item) => {
      const count = (!items[item.item]) ? 1 : items[item.item].quantity + 1;
      // eslint-disable-next-line no-return-assign
      return (
        items[item.item] = {
          name: item.item,
          price: item.price,
          quantity: count,
        }
      );
    });
    const data = Object.keys(items).map((key) => items[key]);
    console.log(data);
    // eslint-disable-next-line no-plusplus
    for (let iter = 0; iter < data.length; iter++) {
      // eslint-disable-next-line no-await-in-loop
      // console.log(`data ${data[iter]}`);
      await dbOperations.updateProductDetails(data[iter].name, data[iter].quantity);
    }
    return 'Checkout!';
  } catch (err) {
    return err.message;
  }
};

module.exports = { checkoutCart };
