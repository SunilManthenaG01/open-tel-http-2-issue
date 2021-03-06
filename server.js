'use strict';

const api = require('@opentelemetry/api');
const  otelSDK = require('./sunil-trace');

otelSDK.start();
const fs = require('fs');
const https = require('https');

/** Starts a HTTPs server that receives requests on sample server port. */
function startServer(port) {
  const options = {
    key: fs.readFileSync('./tem-keys/key.pem'),
    cert: fs.readFileSync('./tem-keys/cert.pem'),
  };
  // Creates a server
  const server = https.createServer(options, handleRequest);
  // Starts the server
  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Node HTTPs listening on ${port}`);
  });
}

/** A function which handles requests and send response. */
function handleRequest(request, response) {
  try {
    const body = [];
    request.on('error', (err) => console.log(err));
    request.on('data', (chunk) => body.push(chunk));
    request.on('end', () => {
      // deliberately sleeping to mock some action.
      setTimeout(() => {
        // span.end();
        response.end('Hello World!');
      }, 2000);
    });
  } catch (err) {
    console.log(err);
    // span.end();
  }
}

startServer(4000);
