const Stream = require('../models/stream');
const oauths = require('../config/oauths');
const rp = require('request-promise');

function streamIndex(req, res, next) {
  return rp({
    method: ''
  })
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
