// Using activity 25 as a reference!

const User = require('../../models/User');

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get a single user by its id and populate thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('__V')
      .then((user) =>
        !user
          ? res.status(400).json({
              message: 'There is no user with that ID, please try again!',
            })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // post a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // put to update a user by its id
  updateUser(req, res) {
    User.findOneAndReplace(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(400).json({
              message: 'There is no user with that ID, please try again!',
            })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete to remove user by its id
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(400).json({
              message: 'There is no user with that ID, please try again!',
            })
          : res.json({
              message: 'User successfully deleted!',
            })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

// **BONUS**: Remove a user's associated thoughts when deleted.
