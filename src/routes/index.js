const { getProducts } = require('../handlers/getDetails');

const routeArray = [
  { path: '/products', method: 'GET', handler: getProducts },
];
module.exports = routeArray;
