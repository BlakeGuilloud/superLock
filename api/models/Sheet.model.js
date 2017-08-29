const mongoose = require('mongoose');

const SheetSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    ref: 'Game',
  },
  userId: {
    type: String,
    required: true,
    ref: 'User',
  },
  confidence: {
    type: Number,
    required: true,
  },
  winnerId: {
    type: String,
    required: true,
    ref: 'Team',
  },
});

module.exports = mongoose.model('Sheet', SheetSchema);