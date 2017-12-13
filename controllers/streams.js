const rp = require('request-promise');

function streamIndex(req, res, next) {
  let game = '';
  let language = '';
  let followers = '';
  let mature = '';
  const userId = req.headers.userid;

  return rp({
    method: 'GET',
    url: `http://localhost:8000/api/users/${userId}`,
    json: true
  })
    .then(user => {
      language = user.language;
      game = user.game;

      return rp({
        method: 'GET',
        url: 'https://api.twitch.tv/kraken/channel',
        json: true,
        headers: {
          'User-Agent': 'Request-Promise',
          'Authorization': `OAuth ${req.headers.twitchtoken}`
        }
      });
    })
    .then(profile => {
      mature = profile.mature;
      followers = profile.followers;
      language = language ? language: profile.language;
      game = game ? game: profile.game;
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
    .then(streamResults => {
      return res.json({streamResults, followers, mature});
    })
    .catch(next);
}

module.exports = {
  index: streamIndex
};
