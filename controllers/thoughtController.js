const { User, Thought } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    console.log('Entering getAllThoughts')
    Thought.find()
    .then((thoughts) => {
        res.json(thoughts)
  }) .catch((err) => res.status(500).json(err));
    },

  getSingleThought(req, res) {
    console.log("entering getSingleThought")
    Thought.find({_id: req.params.thoughtId})
    .select('-__v')
    .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  postThought(req, res) {
    console.log("entering postThought");
    User.findOne({ _id: req.body.userId })
      .select("-__v")
      .then((user) =>{
        if(!user)
            res.status(404).json({ message: "No user with that ID" });
        else{
            console.log(user);
            Thought.create({"thoughtText": req.body.thoughtText, "username": req.body.username})
                .then((thought)=>{  
                    console.log(thought)
                    user.thoughts.push(thought._id);
                    user.save();
                    res.json(user);
            })
        }
    })
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    console.log("Entering updateThought");
    Thought.findByIdAndUpdate({ _id: req.params.thoughtId }, req.body, {new:true})
        .then((thought)=>{
          thought ? res.json(thought) :  res.status(404).json({ message: 'No user with that ID' })
        })
  },
  deleteThought(req, res) {
    console.log("Entering deleteThought");
  },
  addReaction(req, res) {
    
  },
  deleteReaction(req, res) {},
};
