const rp = require('request-promise');

function streamIndex(req, res, next) {
  let game = '';
  let language = '';
  let followers = '';
  let mature = '';
  const userId = req.headers.userid;
  console.log(req.headers);
  return rp({
    method: 'GET',
    url: `https://twinderapp.herokuapp.com/api/users/${userId}`,
    json: true,
    headers: {
      Authorization: `${req.headers.authorization}`
    }
  })
    .then(user => {
      language = user.language;
      game = user.games;
      mature = user.mature;
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
      followers = profile.followers;
      mature = mature? mature: profile.mature;
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
      return res.json({streamResults, followers, mature, game});
    })
    .catch(next);
}

module.exports = {
  index: streamIndex
};
