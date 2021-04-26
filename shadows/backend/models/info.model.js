const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const infoSchema = new Schema({
    url: { type: String, required: true }, 
}, {
    timestamps: true,
});

const Info = mongoose.model('Info', infoSchema); 

module.exports = Info;
