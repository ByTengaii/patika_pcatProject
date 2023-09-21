const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;

const path = require('path');
app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render('index');
});

app.get('/about', (req,res) => {
    res.render('about');
});

app.get('/contact', (req,res) => {
    res.render('contact');
});

app.get('/add', (req,res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Server started at ${port} `);
})