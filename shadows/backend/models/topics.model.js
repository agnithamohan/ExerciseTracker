const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const topicsSchema = new Schema({
    title: { type: String, required: true }, 
    avl_sp: [{
        type:String
    }]
}, {
    timestamps: true,
});

const Topic = mongoose.model('Topic', topicsSchema); 

module.exports = Topic;
