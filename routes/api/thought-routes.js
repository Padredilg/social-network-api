const router = require('express').Router();
const { 
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router.route('/')
    .get(getAllThought)// Get all thoughts
    .post(createThought);//create new thought

// push created thought _id to associated user thoughts array
// example data:
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// } meaning req can be destructured to { body }

router.route('/:id')
    .get(getThoughtById)// Get thoughts by ID
    .put(updateThought)// update thought by ID
    .delete(deleteThought);// Delete thought by ID

router.route('/:thoughtId/reactions')
    .post(createReaction)//create a reaction stored in a single thought's reactions array field

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)//pull and remove a reaction by the reaction's reactionId value
    

module.exports = router;
