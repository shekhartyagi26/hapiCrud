'use strict';

// load deps
const Joi = require('joi');

const UserValidator = {
  list,
  me,
  create,
  logIn
};

module.exports = UserValidator;

function list () {
  return {};
}

function me () {
  return {
    params: {
      id: Joi
        .string()
        .alphanum()
        .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id')
        .required()
    }
  };
}

function create () {
  return {
    payload: {
      name: Joi
        .string()
        .min(1)
        .max(30)
        .trim()
        .required(),
      email: Joi
        .string()
        .email()
        .required(),
      password: Joi
        .string()
        .min(6)
        .max(50)
        .trim()
        .required()
    }
  };
}

function logIn () {
  return {
    payload: {
      email: Joi
        .string()
        .email()
        .required(),
      password: Joi
        .string()
        .trim()
        .required()
    }
  };
}


