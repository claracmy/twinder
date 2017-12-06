const router = require('express').Router();
const oauths = require('../controllers/oauths');
const users = require('../controllers/users');

router.route('/users').get(users.index);
router.route('/users/:id').get(users.show);

router.route('/oauth/twitch').post(oauths.twitch);

module.exports = router;
