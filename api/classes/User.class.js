const User = require('../models/User.model.js');
const Resolver = require('../utils/Resolver');

class Users {
  constructor(db) {
    this.db = db;
  }

  create(event, context, callback) {
    function run() {
      const body = event.body;

      return new Resolver(User.create(body), this.db, callback);
    }

    this.db.once('open', run);
  }

  update(event, context, callback) {
    function run() {
      const id = event.pathParameters.id;
      const body = event.body;

      return User.findByIdAndUpdate(id, body)
        .then(() => new Resolver(User.findById(id), this.db, callback));
    }

    this.db.once('open', run);
  }

  fetchById(event, context, callback) {
    function run() {
      const id = event.pathParameters.id;

      return new Resolver(User.findById(id), this.db, callback);
    }


    this.db.once('open', run);
  }

  fetch(event, context, callback) {
    function run() {
      return new Resolver(User.find(), this.db, callback);
    }

    this.db.once('open', run);
  }

  destroy(event, context, callback) {
    function run() {
      const id = event.pathParameters.id;

      return new Resolver(User.findByIdAndRemove(id), this.db, callback);
    }

    this.db.once('open', run);
  }
}

module.exports = Users;
