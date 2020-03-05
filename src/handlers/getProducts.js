const axios = require('axios');
const dbOperations = require('../utils/dbOperations');

const getProducts = async () => {
  try {
    const allProducts = await axios.get('http://ec2-54-157-238-134.compute-1.amazonaws.com:8080/products');
    const promises = allProducts.data.map((prod) => axios.get(`http://ec2-54-157-238-134.compute-1.amazonaws.com:8080/products/${prod.id}/category`));
    const response = await Promise.all(promises);
    const category = response.map((prod) => (prod.data));
    const products = allProducts.data.map(
      (prod, index) => ({ ...prod, category: category[index].category }),
    );
    for (let iter = 0; iter < products.length; iter++) {
      await dbOperations.insertProductDetailsToDB(products[iter]);
    }
    return (products);
  } catch (err) {
    return err.message;
  }
};


module.exports = { getProducts };
