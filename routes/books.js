'use strict';

const Boom = require('boom');
const BookController =require('../controller/book');
const Validator = require('../schema/book');
exports.register = function (server, options, next) {
    // instantiate controller
    const bookController = new BookController(server.db);
    server.bind(bookController);

    // GET BOOK API
    server.route({
        method: 'GET',
        path: '/books',
        config: {
            handler: bookController.list,
            validate: Validator.list()
        }
    });

    //GET BOOK BY ID
    server.route({
        method: 'GET',
        path: '/books/{id}',
        config: {
            handler: bookController.details,
            validate: Validator.details()
        }
    });

    // CREATE BOOK API
    server.route({
        method: 'POST',
        path: '/books',
        config: {
            handler: bookController.create,
            validate: Validator.create()
        }
    });

    //UPDATE BOOK API

    server.route({
        method: 'PATCH',
        path: '/books/{id}',
        config: {
            handler: bookController.update,
            validate: Validator.update()
        }
    });

    // DELETE BOOK API
    server.route({
        method: 'DELETE',
        path: '/books/{id}',
        config: {
            handler: bookController.destroy,
            validate: Validator.details()
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-books'
};
