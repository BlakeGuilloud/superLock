const Sheet = require('../models/Sheet.model.js');
const Resolver = require('../utils/Resolver');

class Sheets {
  constructor(db) {
    this.db = db;
  }

  create(event, context, callback) {
    function run() {
      const body = event.body;

      return new Resolver(Sheet.create(body), this.db, callback);
    }

    this.db.once('open', run);
  }

  update(event, context, callback) {
    function run() {
      const id = event.pathParameters.id;
      const body = event.body;

      return Sheet.findByIdAndUpdate(id, body)
        .then(() => new Resolver(Sheet.findById(id), this.db, callback));
    }

    this.db.once('open', run);
  }

  fetchById(event, context, callback) {
    function run() {
      const id = event.pathParameters.id;

      return new Resolver(Sheet.findById(id).populate('userId'), this.db, callback);
    }


    this.db.once('open', run);
  }

  fetch(event, context, callback) {
    function run() {
      return new Resolver(Sheet.find().populate('userId'), this.db, callback);
    }

    this.db.once('open', run);
  }

  destroy(event, context, callback) {
    function run() {
      const id = event.pathParameters.id;

      return new Resolver(Sheet.findByIdAndRemove(id), this.db, callback);
    }

    this.db.once('open', run);
  }
}

module.exports = Sheets;