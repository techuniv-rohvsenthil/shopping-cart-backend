const dbOperations = require('../utils/dbOperations');

const updateCart = async (request, h) => {
  try {
    const itemDetails = request.payload;
    if (itemDetails.action === 'store') {
      await dbOperations.insertCartDetailsToDB(itemDetails.cartObj);
      return h.response('Item added');
    }
    await dbOperations.removeCartDetailFromDB(itemDetails.cartObj.item);
    return h.response('Item removed');
  } catch (err) {
    return h.response(err.message);
  }
};


module.exports = { updateCart };
