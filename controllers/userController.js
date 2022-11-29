const {User, Thought} = require('../models')

module.exports = {
    getAllUsers(req,res){
        console.log("Entering getAllUsers");
        User.find()
        // .populate('thoughts')
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
      console.log("Entering deleteUser")
      User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>{
        if(!user){
          res.status(404).json({ message: 'No user with that ID' })
          return;
        }
        else{
          Thought.deleteMany({ _id: { $in: user.thoughts } })
          res.json({ message: 'User and associated thought deleted!' })
        }
      }
       
      )
      // .catch((err) => res.status(500).json(err));
    },
    addFriend(req,res){
        console.log("entering addFriend")
        User.findOne({_id: req.params.friendId})
        .select("-__v")
        .then((friend)=>{
          if(!friend)
            res.status(404).json({ message: "No friend with that ID" });
          else{
            User.findOneAndUpdate({_id: req.params.userId}, {$push: {friends: friend}}, {new:true})
            .then((user)=>{
              user ? res.json(user) :  res.status(404).json({ message: 'No user with that ID' })
            })
          }
        })
    },
    deleteFriend(req,res){
      console.log("entering deleteFriend")
      User.findOne({_id: req.params.friendId})
      .select("-__v")
      .then((friend)=>{
        if(!friend){
          res.status(404).json({ message: "No friend with that ID" });
        }
        else {
          User.updateOne({_id: req.params.userId}, {$pullAll: {friends: [{_id: req.params.friendId}]},}, {new:true})
            .then((user)=>{
              user ? res.json(user) :  res.status(404).json({ message: 'No user with that ID' })
            })
        }
      })
    },

};