const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
  userId: { type: String },
  game: { type: String },
  communityIds: [{}],
  type: { type: String },
  views: { type: Number },
  language: { type: String },
  thumbnail_url: { type: String }
});

module.exports = mongoose.model('Stream', streamSchema);
