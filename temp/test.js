const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PhotoSchema = new Schema({
    tittle: String,
    description: String
});

const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/pcat-test-db');

const Photo = connection.model('Photo',PhotoSchema);

//*ADD value

Photo.create({
    tittle: 'Tittle2',
    description: 'Description2'
});

Photo.find({})
.then(data =>{
    console.log(data);
});

Photo.deleteOne({ tittle: 'Tittle2' })
    .then(data => {
        console.log(`Silinen Data: ${data.tittle}`);
    })
    .catch(err => {
        console.log(`Hata: ${err}`);
    });