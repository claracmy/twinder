const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  twitchId: { type: String, unique: true },
  displayName: { type: String, unique: true },
  displayImage: { type: String },
  language: { type: String },
  mature: { type: Boolean },
  games: String,
  likes: [String],
  dislikes: [String],
  followerCeiling: Number,
  followerFloor: Number
});

module.exports = mongoose.model('User', userSchema);
