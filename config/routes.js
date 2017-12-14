const router = require('express').Router();
const oauths = require('../controllers/oauths');
const users = require('../controllers/users');
const streams = require('../controllers/streams');
const games = require('../controllers/games');

router.route('/users').get(users.index);
router.route('/users/:id').get(users.show).patch(users.patch);
router.route('/games').get(games.index);

router.route('/oauth/twitch').post(oauths.twitch);

router.route('/streams').get(streams.index);

module.exports = router;
