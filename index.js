const { buildServer } = require('./src/server');

const startServer = async () => {
  const server = await buildServer();
  server.start();
  console.log('Server started');
};
startServer();
