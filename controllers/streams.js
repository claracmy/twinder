const Stream = require('../models/stream');
const rp = require('request-promise');

function streamIndex(req, res, next) {
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
    .then(results => {
      const allPages = [];
      const pages = Math.ceil(results._total / 100);

      for ( let i = 0; i < pages; i ++ ) {
        const offset = i * 100;
        const eachPage = {
          method: 'GET',
          url: `https://api.twitch.tv/kraken/streams/?language=${language}&game=${game}&limit=100&offset=${offset}`,
          json: true,
          headers: {
            'User-Agent': 'Request-Promise',
            'Authorization': `OAuth ${req.headers.twitchtoken}`
          }
        };
        allPages.push(rp(eachPage));
      }
      return Promise.all(allPages);
    })
    .then(results2 => {
      return res.json(results2);
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
