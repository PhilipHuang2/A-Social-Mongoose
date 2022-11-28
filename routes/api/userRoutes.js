const router = require('express').Router();
const {
    getAllUsers,
    getUserbyId,
    postUser,
    putUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController')


// /api/users
router.route('/').get(getAllUsers).post(postUser);


// /api/users/:userId
router.route('/:userId').get(getUserbyId).put(putUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;
