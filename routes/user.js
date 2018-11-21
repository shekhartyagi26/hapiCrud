'use strict';

const Boom = require('boom');
const Joi = require('joi');
const User = require('../model.js/user');
const bcrypt = require('bcryptjs');
exports.register = function (server, options, next) {

    // GET USER API
    server.route({
        method: 'GET',
        path: '/user',
        handler: function (request, reply) {

            User.find((err, docs) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(docs);
            });

        }
    });

    // GET USER BY ID
    server.route({
        method: 'GET',
        path: '/me/{id}',
        handler: function (request, reply) {

            User.findOne({
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

    // SIGN UP USER API

    server.route({
        method: 'POST',
        path: '/user',
        handler: function (request, reply) {
            let hashpass;
            if(request.payload.password) {
                var salt = bcrypt.genSaltSync(2);
                hashpass = bcrypt.hashSync(request.payload.password, salt);
            }
            const user = new User({
                name: request.payload.name,
                email: request.payload.email,
                password: hashpass
            });

            User.create(user, (err, result) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(user);
            });
        },
        config: {
            validate: {
                payload: {
                    name: Joi.string().min(10).max(50).required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(6).max(15)
                }
            }
        }
    });

    // LOGIN API
    server.route({
        method: 'POST',
        path: '/user/login',
        handler: function (request, reply) {

            User.findOne({
                email: request.payload.email
            }, function (err, result) {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (result.n === 0) {
                    return reply(Boom.notFound());
                }

                if(result.password) {
                    result.password = bcrypt.hashSync(request.payload.password, 10)
                }

                reply(result);
            });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-user'
};
