const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

// localhost:3001/api/users
router.route('/')
    .get(getAllUser)//get all users
    .post(createUser)//post a new user
    /*{
        "username": "lernantino",
        "email": "lernantino@gmail.com"
    }*/

// localhost:3001/api/users/:id
router.route('/:id')
    .get(getUserById)//get single user by id
    .put(updateUser)//update user by id
    .delete(deleteUser)//delete user by id


module.exports = router;