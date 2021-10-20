const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    removeFriend
} = require('../../controllers/user-controller');

// localhost:3001/api/users
router.route('/')
    .get(getAllUser)
    .post(createUser);

// localhost:3001/api/users/:id
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// localhost:3001/api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(createFriend)
    .put(removeFriend)


module.exports = router;