'use strict';


const UserModel = require('../model/user');
const bcrypt = require('bcryptjs');
const Index = require('../utility/index');
const Boom = require('boom')

function UserController (db) {
  this.database = db;
  this.model = UserModel;
}
UserController.prototype = {
  list,
  me,
  create,
  logIn
};

module.exports = UserController;

// [GET] /user
function list (request, reply) {
  this.model.find({})
  .then((user) => {
    reply(user);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [GET] /user/{id}
function me (request, reply) {
  const id = request.params.id;

  this.model.findOne({_id: id})
  .then((user) => {
    if (!user) {
      reply.notFound();
      return;
    }
    reply(user);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [POST] /user
async function create (request, reply) {
  let password = request.payload.password;
  let hashpass = await Index.bcryptPass(password);
  const user = new UserModel({
    name: request.payload.name,
    email: request.payload.email,
    password: hashpass
  });

  this.model.create(user)
  .then((user) => {
    reply(user)
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

//[POST] /login

function logIn(request, reply) {
  const credentials = request.payload;
  this.model.findOne({
    email: credentials.email
  }).then((user) => {
    if (!bcrypt.compareSync(credentials.password, user.password)) {
      return reply.notFound();
    }
    reply(user);
  }).catch((err) => {
    reply(Boom.wrap(err, 'internal server err'));
  });
}

  


