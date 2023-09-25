const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PhotoSchema = new Schema({
    tittle: String,
    description: String,
    img: String,
    dataCreated: {
        type : Date,
        default: Date.now,
    }
});

const Photo = mongoose.model('Photo',PhotoSchema);

module.exports = Photo;