const { Thought, User } = require('../models');


const thoughtController = {
    // GET all thoughts
    getAllThought: (req, res)=>{
        Thought.find({})//finds all thoughts
            .then(thoughtsData => res.json(thoughtsData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });

    },

    // GET single thought by /:id
    getThoughtById: ({ params }, res)=>{
        Thought.findOne({ _id: params.id })//finds the thought by its ID
            //not sure if should populate thoughts as well
            .then(thoughtData => {
                if(!thoughtData){
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;  
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    
    // POST new thought
    createThought: async ({ body }, res) =>{
        const user = await User.findById(body.userId);
        
        Thought.create({ ...body, username: user.username })
            .then(thoughtData => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: thoughtData._id }},
                    { new: true, runValidators: true }
                )
                .then(dbUserData => {
                    if(!dbUserData){
                        return res.status(404).json({ message: 'No User found with this id!' });
                    }
                })

                res.json(thoughtData)
            })
            .catch(err => res.status(400).json(err))
    },
    
    // PUT update thought by /:id
    updateThought: ({ params, body }, res) =>{
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    
    // DELETE thought by /:id
    deleteThought: ({ params }, res) => {
        Thought.findOneAndDelete({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // POST create reaction in a thought /:thoughtId/reactions
    createReaction: async ({ params, body } , res) =>{
        const user = await User.findById(body.userId);

        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, 
            { $push: { reactions: { ...body, username: user.username } } },
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
    },

    // DELETE reaction from a thought /:thoughtId/reactions/:reactionId
    deleteReaction: ({ params }, res) =>{
        console.log(params);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true, runValidators: true }
        )
            .then(thoughtData =>{
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    }
}

//will be required by routes
module.exports = thoughtController;