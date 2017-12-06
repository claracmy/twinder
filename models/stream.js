const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
  streamId: { type: String },
  userId: { type: String },
  gameId: { type: String },
  communityIds: [{}],
  type: { type: String },
  title: { type: String },
  viewer_count: { type: Number },
  started_at: { type: Date },
  language: { type: String },
  thumbnail_url: { type: String }
});

module.exports = mongoose.model('Streamer', streamSchema);
