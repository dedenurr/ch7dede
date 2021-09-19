const mongoose = require('mongoose');

var schemaBiodata = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: String,
  status: String,
});

const UserGameBiodata = mongoose.model('user_game_biodata', schemaBiodata);

module.exports = UserGameBiodata;
