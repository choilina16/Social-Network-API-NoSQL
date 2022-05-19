const router = require('express').Router();
// Using object deconstruction to call into this js file
const {
  getThoughts, //tested
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addThoughtReaction,
  removeThoughtReaction,
} = require('../../controllers/thoughtControllers');

// Endpoint /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// Endpoint /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field
// DELETE to pull and remove a reaction by the reaction's reactionId value

router
  .route('/:thoughtId/reactions')
  .post(addThoughtReaction)
  .delete(removeThoughtReaction);

module.exports = router;
