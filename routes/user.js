'use strict';

const Boom = require('boom');
const UserController =require('../controller/user');
const Validator = require('../schema/user');
exports.register = function (server, options, next) {
    // instantiate controller
    const userController = new UserController(server.db);

    server.bind(userController);

    // GET USER API
    server.route({
        method: 'GET',
        path: '/users',
        config: {
            handler: userController.list,
            validate: Validator.list()
        }
    });

    //GET USER BY ID
    server.route({
        method: 'GET',
        path: '/users/{id}',
        config: {
            handler: userController.me,
            validate: Validator.me()
        }
    });

    // CREATE USER API
    server.route({
        method: 'POST',
        path: '/users',
        config: {
            handler: userController.create,
            validate: Validator.create()
        }
    });

    //LOGIN USER API

    server.route({
        method: 'POST',
        path: '/users/login',
        config: {
            handler: userController.logIn,
            validate: Validator.logIn()
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-users'
};
