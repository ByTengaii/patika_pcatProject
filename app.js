const express = require('express');
const ejs = require('ejs');
const Photo = require('./models/Photo.js')
const app = express();
const port = 3000;

const path = require('path');
const mongoose = require('mongoose');
app.set('view engine','ejs');

//* Connect to mongoDB database
mongoose.connect('mongodb://localhost/pcat-test-db');

//* Middle Wares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//* ROUTES
app.get('/', async (req,res) => {
    const photos = await Photo.find({}).exec();
    res.render('index', {
        photos
    });
});

app.get('/about', (req,res) => {
    res.render('about');
});

app.get('/contact', (req,res) => {
    res.render('contact');
});

app.get('/photo/:id', async (req,res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('photo-page', {
        photo
    });
});

app.post('/photo', async (req, res) => {
    await Photo.create(req.body); // Adding value to mongoDB
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Server started at ${port} `);
})