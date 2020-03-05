const { getProducts } = require('../handlers/getProducts');
const { updateCart } = require('../handlers/updateCart');

const routeArray = [
  { path: '/products', method: 'GET', handler: getProducts },
  { path: '/items', method: 'POST', handler: updateCart },
];
module.exports = routeArray;
