const User = require('../models/user');

function usersIndex(req, res, next) {
  User.find()
    .exec()
    .then(users => res.status(200).json(users))
    .catch(next);
}

function usersShow(req, res, next) {
  User.findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found.' });
      return res.status(200).json(user);
    })
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow
};
