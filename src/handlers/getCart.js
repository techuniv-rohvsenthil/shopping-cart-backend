const dbOperations = require('../utils/dbOperations');

const getCart = async () => {
  try {
    const res = await dbOperations.retrieveCartDetailFromDB();
    return res;
  } catch (err) {
    return err.message;
  }
};

module.exports = { getCart };
