const { getProducts } = require('../handlers/getProducts');
const { updateCart } = require('../handlers/updateCart');
const { getCart } = require('../handlers/getCart');

const routeArray = [
  { path: '/products', method: 'GET', handler: getProducts },
  { path: '/items', method: 'POST', handler: updateCart },
  { path: '/items', method: 'GET', handler: getCart },
];
module.exports = routeArray;
