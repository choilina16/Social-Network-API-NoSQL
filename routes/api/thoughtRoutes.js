const router = require('express').Router();
// Using object deconstruction to call into this js file
const {
  getThoughts, //tested
  getSingleThought, //tested
  createThought, //tested
  updateThought, //tested
  deleteThought, //tested
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
router.route('/:thoughtId/reactions').post(addThoughtReaction);

// /api/thoughts/:thoughtId/reactions/reactionsId
// DELETE to pull and remove a reaction by the reaction's reactionId value
router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReaction);

module.exports = router;
