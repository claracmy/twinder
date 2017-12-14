const Game = require('../models/game');

function gamesIndex (req, res, next) {
  Game
    .find()
    .exec()
    .then(res => res.status(200).json(res))
    .catch(next);
}

module.exports = {
  index: gamesIndex
};
