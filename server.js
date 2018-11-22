'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');
const db = require('./database').db;

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost', 
    port: 3000
});

//Load plugins and start server
server.register([
    require('./routes/books'),
    require('./routes/userSchema')
], (err) => {

    if (err) {
        throw err;
    }

    // Start the server
    server.start((err) => {
        console.log('Server running at:', server.info.uri);
    });

});
