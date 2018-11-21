'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');
const swaggered = require('hapi-swaggered');
const swaggeredUI = require('hapi-swaggered-ui');
const vision = require('vision');
const inert = require('inert');
const db = require('./database').db;

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost', 
    port: 3000
});

// //Connect to db
// server.app.db = mongojs('hapi-rest-mongo', ['books']);

//Load plugins and start server
server.register([
    require('./routes/books'),
    require('./routes/user')
], (err) => {

    if (err) {
        throw err;
    }

    // Start the server
    server.start((err) => {
        console.log('Server running at:', server.info.uri);
    });

});
