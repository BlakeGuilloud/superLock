// Mongoose and Promise config.
const mongoose = require('mongoose');
const bluebird = require('bluebird');
mongoose.Promise = bluebird;

// Handlers / Lambda functions
function create(event, context, callback, model) {
  return model.create(event, context, callback);
}

function update(event, context, callback, model) {
  return model.update(event, context, callback);
}

function fetchById(event, context, callback, model) {
  return model.fetchById(event, context, callback);
}

function fetch(event, context, callback, model) {
  return model.fetch(event, context, callback);
}

function destroy(event, context, callback, model) {
  return model.destroy(event, context, callback);
}

// DB connection
const mongoString = process.env.MONGODB_URI;
const db = mongoose.connect(mongoString).connection;

// Business Logic
const Sheets = require('./classes/Sheet.class');
const Users = require('./classes/User.class');

const sheets = new Sheets(db);
const users = new Users(db);

// Exports
module.exports = {
  createSheet: (...args) => create(...args, sheets),
  fetchSheetById: (...args) => fetchById(...args, sheets),
  fetchSheets: (...args) => fetch(...args, sheets),
  destroySheet: (...args) => destroy(...args, sheets),
  updateSheet: (...args) => update(...args, sheets),
  createUser: (...args) => create(...args, users),
  fetchUserById: (...args) => fetchById(...args, users),
  fetchUsers: (...args) => fetch(...args, users),
  destroyUser: (...args) => destroy(...args, users),
  updateUser: (...args) => update(...args, users),
};