const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const buildServer = async () => {
  const server = Hapi.Server({
    host: 'localhost',
    port: 8080,
    routes: {
      cors: true,
    },
  });
  // server.route(routes);
  return server;
};

module.exports = { buildServer };
