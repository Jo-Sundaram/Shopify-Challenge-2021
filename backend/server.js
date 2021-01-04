const debug = require("debug")("WebTemplateStudioExpress:server");
const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const CONSTANTS = require("./config/constants");



//Get port from environment and store in Express.
const port = normalizePort(CONSTANTS.PORT);
app.set("port", port);


// Connect to MongoDB 
const uri = CONSTANTS.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connection with MongoDb successfully established');
})

// console.log(uri);

// Create HTTP server.

const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
console.log("listening on port 5000");

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
