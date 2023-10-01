const Photo = require('../models/Photo');

exports.getIndexPage = async (req, res) => { // Retrieve index page
    const photos = await Photo.find({}).sort('-dateCreated'); 
    
    res.render('index', { // Render index page with photos
        photos,
    });
}

exports.getAboutPage = (req, res) => {
    res.render('about');
};

exports.getAddPage = (req, res) => {
    res.render('add');
};

