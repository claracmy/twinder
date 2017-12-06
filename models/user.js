const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  twitchId: { type: String, unique: true },
  displayName: { type: String, unique: true },
  displayImage: { type: String },
  language: { type: String },
  games: [String]

});

module.exports = mongoose.model('User', userSchema);
