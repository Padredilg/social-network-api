const { User } = require('../models');

const userController = {
    // get all Users
    getAllUser(req, res){
        User.find({})//finds all users already
            /* can I 

            .populate({ path: 'thoughts', select: '-__v'})
            .select('-__v') 

            to get all thoughts created by this user?
            */
            .sort({_id: -1})//sort alphabetically I think
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });

    },
    // get single user by Id
    getUserById({ params }, res){
        User.findOne({ _id: params.id })//finds the user
            //not sure if should populate thoughts as well
            .then(userData => {
                if(!userData){
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;  
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // post new user
    createUser({ body }, res){
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err))
    },
    // update user by Id
    updateUser({ params, body }, res){
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete user by id
    deleteUser({ params }, res){
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    }
    
    // BONUS: Remove a user's associated thoughts when deleted.
}

//This will be required by routes
module.exports = userController;