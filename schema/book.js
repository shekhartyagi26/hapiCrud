'use strict';

// load deps
const Joi = require('joi');

const BookValidator = {
  list,
  details,
  create,
  update,
  destroy
};

module.exports = BookValidator;

function list () {
  return {};
}

function details () {
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
      author: Joi
        .string()
        .min(1)
        .max(20)
        .trim()
        .required(),
      description: Joi
        .string()
        .min(1)
        .max(30)
        .trim()
        .required()
    }
  };
}

function update () {
  return {
    params: {
      id: Joi
        .string()
        .alphanum()
        .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id')
        .required()
    },
    payload: {
     name: Joi
        .string()
        .min(1)
        .max(30)
        .trim()
        .required(),
      author: Joi
        .string()
        .min(1)
        .max(20)
        .trim()
        .required(),
      description: Joi
        .string()
        .min(1)
        .max(30)
        .trim()
        .required()
    }
  };
}

function destroy () {
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
