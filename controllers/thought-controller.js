const { Thought, User } = require('../models');

const thoughtController = {
    // GET all thoughts
    getAllThought(req, res){
        Thought.find({})//finds all thoughts
            .then(thoughtsData => res.json(thoughtsData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });

    },

    // GET single thought by /:id
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.id })//finds the thought
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
    createThought({ body }, res){
        Thought.create(body)
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err))
    },
    
    // PUT update thought by /:id
    updateThought({ params, body }, res){
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
    deleteThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.id })
            .then(thoughtData => {
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