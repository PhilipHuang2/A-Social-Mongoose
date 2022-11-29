const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  postThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route('/').get(getAllThoughts).post(postThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:userId/reactions
router.route('/:thoughtId/reactions').post(addReaction)

// /api/thoughts/:userId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
