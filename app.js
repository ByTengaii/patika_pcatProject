//* Environments
const express = require('express');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const fs = require('fs');
const ejs = require('ejs');
const Photo = require('./models/Photo.js');
const path = require('path');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const photoController = require('./controller/photoController.js');
const pageController = require('./controller/pageController.js');

const app = express();
app.set('view engine', 'ejs');

//* Connect to mongoDB database
mongoose.connect('mongodb+srv://agirgurkan06:pJnUtDIPsQLBNgqd@cluster0.la2jpus.mongodb.net/');

//* Middle Wares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
    methods:['GET','POST']
}));

//* ROUTES
app.get('/', pageController.getIndexPage);
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);

app.get('/photo/:id',photoController.getPhotoPage);
app.post('/photo', photoController.createPhoto);
app.put('/photo/:id',photoController.updatePhoto);
app.get('/photo/edit/:id',photoController.editPhotoPage);
app.delete('/photo/:id',photoController.deletePhoto);

app.listen(port, () => {
    console.log(`Server started at ${port} `);
});
