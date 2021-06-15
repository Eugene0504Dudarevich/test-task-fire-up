const app = require('./app');
const debug = require('debug')('backend:server');
const http = require('http');

const port = normalizePort(process.env.PORT || '9000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Successfully connected on port ${port}`);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false
 */
function normalizePort(value) {
  const port = parseInt(value, 10);
  if (isNaN(port)) {
    return value;
  }
  
  if (port >= 0) {
    return port;
  }
  
  return false;
}

/**
 * Event listener for HTTP server "error" event
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  
  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event
 */
function onListening() {
  const address = server.address();
  const bind = typeof address === 'string'
    ? 'pipe ' + address
    : 'port ' + address.port;
  debug('Listening on ' + bind);
}