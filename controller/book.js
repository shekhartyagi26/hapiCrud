'use strict';


const Book = require('../model/book');
const Boom = require('boom');
const apiHandler = require('../apiHandler');
const Error = require('../errors')
function BookController (db) {
  this.database = db;
  this.model = Book;
}
BookController.prototype = {
  list,
  details,
  create,
  update,
  destroy
};

module.exports = BookController;

// [GET] /book
function list (request, reply) {
  this.model.find({})
  .then((book) => {
    apiHandler(request, reply, book)
  })
  .catch((err) => {
    reply(Error.internal('internal server errors'));
  });
}

// [GET] /book/{id}
function details (request, reply) {
  const id = request.params.id;

  this.model.findOne({_id: id})
  .then((book) => {
    if (!book) {
      reply.notFound();
      return;
    }
    apiHandler(request, reply, book)
  })
  .catch((err) => {
    reply(Error.internal('internal server errors'));
  });
}

// [POST] /book
async function create (request, reply) {
  try {
     const payload = request.payload;
     let result = await this.model.create(payload);
     apiHandler(request, reply, result)
  } catch(err) {
      reply(Error.internal('internal server errors'));
  }
}

// [PUT] /book
function update (request, reply) {
  const id = request.params.id;
  const payload = request.payload;

  this.model.findOneAndUpdate({_id: id}, {$set: payload}, {new: true})
  .then((book) => {
    apiHandler(request, reply, book)
  })
  .catch((err) => {
    reply(Error.internal('internal server errors'));
  });
}

// [DELETE] /book
function destroy (request, reply) {
  const id = request.params.id;

  this.model.remove({_id: id})
  .then(() => {
    apiHandler(request, reply, "book is deleted!")
  })
  .catch((err) => {
    reply(Error.internal('internal server errors'));
  });
}


