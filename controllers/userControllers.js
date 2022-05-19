// Using activity 25 & 28 Mini Project as a reference!

const { User, Thought } = require('../models');

module.exports = {
  // get all users
  getUsers(req, res) {
    console.log('You are getting all users');
    User.find()
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get a single user by its id and populate thought and friend data
  getSingleUser(req, res) {
    console.log('You are getting a single user based on input');
    User.findOne({ _id: req.params.userId })
      // I FORGOT THE - AND IT TOOK ME FOREVER TO REFACTOR THIS!!!-_-
      .select('-__V')
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
    console.log('You are creating a new user');
    console.log(req.body);
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // put to update a user by its id
  updateUser(req, res) {
    console.log('You are updating a new user');
    User.findOneAndUpdate(
      { _id: req.params.userId },
      // $set operator replaces the value of a field with the specified value
      // https://www.mongodb.com/docs/v4.4/reference/operator/update/set/?_ga=2.248019714.409276284.1652844328-365324824.1651247215
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
  // **BONUS**: Remove a user's associated thoughts when deleted.
  deleteUser(req, res) {
    console.log('You are deleting a user');
    User.findOneAndRemove({ _id: req.params.userId })
      .then(
        (user) =>
          !user
            ? res.status(400).json({
                message: 'There is no user with that ID, please try again!',
              })
            : res.json({ message: 'User successfully deleted!' })
        // : Thought.deleteMany({ _id: { $in: user.Thought } })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // add a friend
  addUserFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      // $addToSet operator adds a value to an array unless the value is already presented
      // ensures that there are no duplicated items added to the set and does not affect existing duplicate elements.
      // https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(400)
              .json({ message: 'No user with this ID, please try again!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // remove a friend
  removeUserFriend(req, res) {
    console.log('You are removing a friend');
    User.findOneAndRemove(
      { _id: req.params.userId },
      { $pull: { friends: { friendsId: req.params.friendsId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(400)
              .json({ message: 'No user with this ID, please try again!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
