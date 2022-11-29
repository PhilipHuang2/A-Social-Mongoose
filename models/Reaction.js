const {Schema, Types} = require('mongoose')

const reactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: true,
        maxlength:280,
    },
    username:{
        type:String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: function(date){
            return `${date.getMonth()+1}/${date.getDate()+1}/${date.getfullYear()}`
        }
    },
});

module.exports = reactionSchema;