const { User, Thought } = require('../models');

const userController = {
    // GET all Users
    getAllUser(req, res){
        User.find({})//finds all users alreadycan I 
            .populate({ path: 'thoughts', select: '-__v'})
            .select('-__v')
            .sort({username: "asc"})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });

    },
    // GET single user by Id
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
    // POST new user
    createUser({ body }, res){
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err))
    },
    // PUT update user by Id
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
    // DELETE user by id
    async deleteUser({ params }, res){
        const user = await User.findById(params.id);
        await Thought.deleteMany(
            { username: user.username }
        );
        User.deleteOne({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },
    // PUT create friend /:userId/friends/:friendId
    createFriend({ params }, res){
        User.findOneAndUpdate({ _id: params.userId }, { $addToSet: { friends: params.friendId } }, { new: true, runValidators: true })
            .then(friendData => {
                if (!friendData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }

                res.json(friendData)
            })
            .catch(err => res.status(400).json(err));
    },
    // DELETE friend /:userId/friends/:friendId
    removeFriend({ params }, res){
        User.findOneAndUpdate(
                { _id: params.userId }, 
                { $pull: { friends: params.friendId }},
                { new: true, runValidators: true }   
            )
            .then(friendData => {
                if (!friendData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(friendData)
            })
            .catch(err => res.status(400).json(err));
    }
    
    // BONUS: Remove a user's associated thoughts when deleted.
}

//This will be required by routes
module.exports = userController;