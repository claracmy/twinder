const Stream = require('../models/stream');
const rp = require('request-promise');

function streamIndex(req, res, next) {
  let userFollowers = '';
  let game = '';
  let language = '';

  return rp({
    method: 'GET',
    url: 'https://api.twitch.tv/kraken/channel',
    json: true,
    headers: {
      'User-Agent': 'Request-Promise',
      'Authorization': `OAuth ${req.headers.twitchtoken}`
    }
  })
    .then(profile => {
      userFollowers = profile.followers;
      game = profile.game;
      language = profile.language;
      return rp({
        method: 'GET',
        url: `https://api.twitch.tv/kraken/streams/?language=${language}&game=${game}&limit=100`,
        json: true,
        headers: {
          'User-Agent': 'Request-Promise',
          'Authorization': `OAuth ${req.headers.twitchtoken}`
        }
      });
    })
    .then(res => {
      const offset = 100;
      if ((res.streams[0].channel.followers > userFollowers) && (res.streams[99].channel.followers > userFollowers)) {
        return rp({
          method: 'GET',
          url: `https://api.twitch.tv/kraken/streams/?language=${language}&game=${game}&limit=1&offset=${offset}`,
          json: true,
          headers: {
            'User-Agent': 'Request-Promise',
            'Authorization': `OAuth ${req.headers.twitchtoken}`
          }
        });
      }
    })
    .then(res => {

      return res.json(res.data);
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
