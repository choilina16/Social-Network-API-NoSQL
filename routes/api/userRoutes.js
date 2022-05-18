const router = require('express').Router();
// Using object deconstruction to call into this js file
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userControllers');

// Endpoint /api/users
router.route('/').get(getUsers).post(createUser);

// Endpoint /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId

module.exports = router;
