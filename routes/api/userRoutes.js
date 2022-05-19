const router = require('express').Router();
// Using object deconstruction to call into this js file
const {
  getUsers, //tested
  getSingleUser, // tested
  createUser, // tested
  updateUser, // tested
  deleteUser, // tested
  addUserFriend, // tested
  removeUserFriend,
} = require('../../controllers/userControllers');

// Endpoint /api/users
router.route('/').get(getUsers).post(createUser);

// Endpoint /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends
// POST to add a new friend to a user's friend list
router.route('/:userId/friends').post(addUserFriend);
// /api/users/:userId/friends/:friendId
// DELETE to remove a friend from a user's friend list
router.route('/:userId/friends/:friendId').delete(removeUserFriend);

module.exports = router;
