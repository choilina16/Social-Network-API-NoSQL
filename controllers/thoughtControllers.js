// Using activity 25 & 28 Mini Project as a reference!

const { User, Thought } = require('../models');

module.exports = {
  // get to get all thoughts
  getThoughts(req, res) {
    console.log('You are getting all thoughts');
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get to get a single thought by its _id
  getSingleThought(req, res) {
    console.log('You are getting a single thought based on input');
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__V')
      .then((thought) =>
        !thought
          ? res.status(400).json({
              message: 'There is no thought with that ID, please try again!',
            })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  createThought(req, res) {
    console.log('You are creating a thought');
    console.log(req.body);
    Thought.create(req.body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // PUT to update a thought by its _id
  updateThought(req, res) {
    console.log('You are updating a new thought');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(400).json({
              message: 'There is no thought with that ID, please try again!',
            })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // DELETE to remove a thought by its _id
  deleteThought(req, res) {
    console.log('You are deleting a thought');
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(400).json({
              message: 'There is no thought with that ID, please try again!',
            })
          : res.json({ message: 'Thought successfully deleted!' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // add a reaction
  addThoughtReaction(req, res) {
    console.log('You are adding a thought reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(400)
              .json({ message: 'No thought with this ID, please try again!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // remove a reaction
  removeThoughtReaction(req, res) {
    console.log('You are removing a thought reaction');
    Thought.findOneAndRemove(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionsId: req.params.reactionsId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(400)
              .json({ message: 'No thought with this ID, please try again!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
