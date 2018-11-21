'use strict';

const Boom = require('boom');
const Joi = require('joi');
const Book = require('../model.js/book');

exports.register = function (server, options, next) {

    const db = server.app.db;

    server.route({
        method: 'GET',
        path: '/books',
        handler: function (request, reply) {

            Book.find((err, docs) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(docs);
            });

        }
    });

    server.route({
        method: 'GET',
        path: '/books/{id}',
        handler: function (request, reply) {

            Book.findOne({
                _id: request.params.id
            }, (err, doc) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (!doc) {
                    return reply(Boom.notFound());
                }

                reply(doc);
            });

        }
    });

    server.route({
        method: 'POST',
        path: '/books',
        handler: function (request, reply) {

            // const book = request.payload;

            // //Create an id
            // book._id = uuid.v1();
            const book = new Book({
                name: request.payload.name,
                author: request.payload.author,
                description: request.payload.description
            });

            Book.create(book, (err, result) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(book);
            });
        },
        config: {
            validate: {
                payload: {
                    name: Joi.string().min(10).max(50).required(),
                    author: Joi.string().min(10).max(50).required(),
                    description: Joi.string().min(20).max(100).required()
                }
            }
        }
    });

    server.route({
        method: 'PATCH',
        path: '/books/{id}',
        handler: function (request, reply) {
            console.log('id', request.params.id)
            Book.update({
                _id: request.params.id
            }, {
                $set: request.payload
            }, function (err, result) {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (result.n === 0) {
                    return reply(Boom.notFound());
                }

                reply().code(204);
            });
        },
        config: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().min(10).max(50).optional(),
                    author: Joi.string().min(10).max(50).optional(),
                    description: Joi.string()
                }).required().min(1)
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/books/{id}',
        handler: function (request, reply) {

            Book.remove({
                _id: request.params.id
            }, function (err, result) {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (result.n === 0) {
                    return reply(Boom.notFound());
                }

                reply().code(204);
            });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-books'
};
