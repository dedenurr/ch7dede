const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types;

var schemaGame = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  usergamebiodataid: {
    type: ObjectId,
    ref: 'user_game_biodata',
  },
  usergamehistoryid: {
    type: ObjectId,
    ref: 'user_game_history',
  },
});

const UserGame = mongoose.model('user2_game', schemaGame);

module.exports = UserGame;
