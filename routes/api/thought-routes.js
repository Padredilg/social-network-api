const router = require('express').Router();
const { 
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
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



module.exports = router;
