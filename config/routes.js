const router = require('express').Router();
const oauths = require('../controllers/oauths');
const users = require('../controllers/users');
const streams = require('../controllers/streams');

router.route('/users').get(users.index);
router.route('/users/:id').get(users.show).put(users.update);

router.route('/oauth/twitch').post(oauths.twitch);

router.route('/streams').get(streams.index);

module.exports = router;
