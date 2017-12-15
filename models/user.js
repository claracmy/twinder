const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  twitchId: { type: String, unique: true },
  displayName: { type: String, unique: true },
  displayImage: { type: String },
  language: { type: String, enum: [
    'en',
    'zh',
    'ja',
    'ko',
    'es',
    'pt',
    'de',
    'pl',
    'ru',
    'fr',
    'it',
    'sv',
    'no',
    'da',
    'nl',
    'fi',
    'tr',
    'cs',
    'hu',
    'sk'
  ] },
  mature: { type: Boolean },
  games: { type: String },
  likes: [String],
  dislikes: [String],
  followerCeiling: Number,
  followerFloor: Number
});

module.exports = mongoose.model('User', userSchema);
