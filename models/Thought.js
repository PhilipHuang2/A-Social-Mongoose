const{Schema, Types, model } = require("mongoose");
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength:280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: function(date){
            return `${date.getMonth()+1}/${date.getDate()+1}/${date.getfullYear()}`
        }
    },
    username:{
        type:String,
        required: true,
    },
    reactions: [reactionSchema]
},{toJSON:{
    virtuals: true,
    id: false,
}});

thoughtSchema.virtual('reactionCount').get(function(){
    this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;