const router = require('express').Router();
const secureRoute = require('../lib/secureRoute');
const oauths = require('../controllers/oauths');
const users = require('../controllers/users');
const streams = require('../controllers/streams');
const games = require('../controllers/games');

router.route('/users/:id').get(secureRoute, users.show).patch(secureRoute, users.patch);

router.route('/games').get(games.index);

router.route('/oauth/twitch').post(oauths.twitch);

router.route('/streams').get(secureRoute, streams.index);

module.exports = router;
