const { User } = require('../models');

const userController = {
    // get all Users
    getAllUser(req, res){
        User.find({})//finds all users already
        //can I .populate({ path: 'thoughts', select: '-__v'}).select('-__v') all thoughts created by this user?
            .sort({_id: -1})//sort alphabetically I think
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });

    }

    // get single user by Id
    // getUserById

    // post new user
    // createUser

    // update user by Id
    // updateUser

    // delete user by id
    // deleteUser
}

//This will be required (possibly with destructuring method) by routes
module.exports = userController;