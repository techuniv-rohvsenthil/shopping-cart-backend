const { getProducts } = require('../handlers/getProducts');

const routeArray = [
  { path: '/products', method: 'GET', handler: getProducts },
];
module.exports = routeArray;
