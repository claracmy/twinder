const Stream = require('../models/stream');
const rp = require('request-promise');

function streamIndex(req, res, next) {
  return rp({
    method: 'GET',
    url: 'https://api.twitch.tv/helix/streams',
    json: true,
    headers: {
      'User-Agent': 'Request-Promise',
      'Authorization': `Bearer ${req.headers.twitchtoken}`
    }
  })
    .then(streams => {
      return res.status(200).json(streams);
    })
    .catch(next);
}

function streamShow(req, res, next) {
  Stream
    .findById(req.params.id)
    .exec()
    .then(stream => {
      return res.status(200).json(stream);
    })
    .catch(next);
}

module.exports = {
  index: streamIndex,
  show: streamShow
};
