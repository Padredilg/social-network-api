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

// localhost:3001/api/thoughts
router.route('/')
    .get(getAllThought)
    .post(createThought);

// localhost:3001/api/thoughts/:id
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// localhost:3001/api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(createReaction)//create a reaction stored in a single thought's reactions array field

// localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)//pull and remove a reaction by the reaction's reactionId value
    

module.exports = router;
