const Game = require('../models/game');

function gamesIndex (req, res, next) {
  Game
    .find()
    .exec()
    .then(games => res.status(200).json(games))
    .catch(next);
}

module.exports = {
  index: gamesIndex
};
