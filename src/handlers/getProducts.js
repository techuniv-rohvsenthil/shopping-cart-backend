const axios = require('axios');
const dbOperations = require('../utils/dbOperations');

const getProducts = async () => {
  try {
    const res = await dbOperations.retrieveProductDetailsFromDB();
    if (res.length < 1) {
      const allProducts = await axios.get('http://ec2-54-157-238-134.compute-1.amazonaws.com:8080/products');
      const promises = allProducts.data.map((prod) => axios.get(`http://ec2-54-157-238-134.compute-1.amazonaws.com:8080/products/${prod.id}/category`));
      const response = await Promise.all(promises);
      const category = response.map((prod) => (prod.data));
      const products = allProducts.data.map(
        (prod, index) => ({ ...prod, category: category[index].category }),
      );
      // eslint-disable-next-line no-plusplus
      for (let iter = 0; iter < products.length; iter++) {
        // eslint-disable-next-line no-await-in-loop
        await dbOperations.insertProductDetailsToDB(products[iter]);
      }
      return (products);
    }
    return (res);
  } catch (err) {
    return err.message;
  }
};


module.exports = { getProducts };
