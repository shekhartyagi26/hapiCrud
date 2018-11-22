'use strict';


const Book = require('../model/book');
const Boom = require('boom');

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
    reply(book);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
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
    reply(book);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [POST] /book
function create (request, reply) {
  const payload = request.payload;

  this.model.createAsync(payload)
  .then((book) => {
    reply(book)
  })
  .catch((err) => {
    reply.badImplementationmodel(err.message);
  });
}

// [PUT] /book
function update (request, reply) {
  const id = request.params.id;
  const payload = request.payload;

  this.model.findOneAndUpdate({_id: id}, {$set: payload}, {new: true})
  .then((book) => {
    reply(book);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [DELETE] /book
function destroy (request, reply) {
  const id = request.params.id;

  this.model.remove({_id: id})
  .then(() => {
    reply();
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}


