const {User} = require('../models')

module.exports = {
    getAllUsers(req,res){
        console.log("Entering getAllUsers");
        User.find()
        .then((users) => {
            res.json(users)}
        )
        .catch((err) => res.status(500).json(err));
    }, 
    getUserbyId(req,res){
        console.log("Entering getUserbyId");
        User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    }, 
    postUser(req,res){
        console.log("Entering postUser");
        User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
    }, 
    putUser(req,res){
        console.log("Entering putUser");
        User.findByIdAndUpdate({ _id: req.params.userId }, req.body, {new:true})
        .then((user)=>{
          user ? res.json(user) :  res.status(404).json({ message: 'No user with that ID' })
        })
    }, 
    deleteUser(req,res){

    },
    addFriend(req,res){

    },
    deleteFriend(req,res){

    },

};