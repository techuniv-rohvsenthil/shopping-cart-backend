const dbOperations = require('../utils/dbOperations');

const checkoutCart = async (request, h) => {
  try {
    // const itemDetails = request.payload;
    await dbOperations.removeAllFromCart();
    return 'Checkout!';
  } catch (err) {
    return err.message;
  }
};

module.exports = { checkoutCart };
