const oauths = require('../config/oauths');
const User = require('../models/user');
const rp = require('request-promise');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function twitch(req, res, next) {
  let twitchToken = '';

  return rp({
    method: 'POST',
    url: 'https://api.twitch.tv/kraken/oauth2/token',
    qs: {
      client_id: oauths.twitch.clientId,
      client_secret: oauths.twitch.clientSecret,
      code: req.body.code,
      grant_type: 'authorization_code',
      redirect_uri: oauths.twitch.redirectUri
    },
    json: true
  })
    .then(token => {
      twitchToken = token.access_token;
      return rp({
        method: 'GET',
        url: 'https://api.twitch.tv/kraken/channel',
        json: true,
        headers: {
          'User-Agent': 'Request-Promise',
          'Authorization': `OAuth ${token.access_token}`,
          'Accept': 'application/vnd.twitchtv.v5+json',
          'Client-ID': oauths.twitch.clientId
        }
      });
    })
    .then(profile => {
      req._profile = profile;
      return User.findOne({ twitchId: req._profile._id });
    })
    .then(user => {
      if (!user) {
        user = new User({
          twitchId: req._profile._id,
          displayName: req._profile.display_name
        });
      }
      user.language = req._profile.language;
      user.mature = req._profile.mature;
      user.games = req._profile.game;
      user.displayImage = req._profile.logo;
      return user.save();
    })
    .then(user => {
      const payload = { userId: user.id };
      const token = jwt.sign(payload, secret, {expiresIn: '1hr'});
      return res.json({
        twitchToken,
        token,
        user,
        message: `Welcome back ${user.displayName}`
      });
    })
    .catch(next);
}

module.exports = {
  twitch
};
