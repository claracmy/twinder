const oauths = require('../config/oauths');
const User = require('../models/user');
const rp = require('request-promise');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function twitch(req, res, next) {
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
      return rp({
        method: 'GET',
        url: 'https://api.twitch.tv/helix/users',
        json: true,
        headers: {
          'User-Agent': 'Request-Promise',
          'Authorization': `Bearer ${token.access_token}`
        }
      });
    })
    .then(profile => {
      req._profile = profile.data[0];
      return User.findOne({ twitchId: req._profile.id });
    })
    .then(user => {
      if (!user) {
        user = new User({
          twitchId: req._profile.id,
          displayName: req._profile.display_name
        });
      }
      user.displayImage = req._profile.profile_image_url;
      return user.save();
    })
    .then(user => {
      const payload = { userId: user.id };
      const token = jwt.sign(payload, secret, {expiresIn: '1hr'});
      return res.json({
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
