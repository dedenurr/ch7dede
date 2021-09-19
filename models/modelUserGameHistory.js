const mongoose = require('mongoose');

var schemaHistory = new mongoose.Schema({
  gamehistory: {
    type: Number,
    required: true,
  },
  statuswin: {
    type: String,
    required: true,
  },
});

const UserGameHistory = mongoose.model('user_game_history', schemaHistory);

module.exports = UserGameHistory;
