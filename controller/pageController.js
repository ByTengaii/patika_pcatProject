const Photo = require('../models/Photo');

exports.getIndexPage = async (req, res) => { // Retrieve index page
    const page = req.query.page || 1; //Viewing page
    const photoPerPage = 3; 
    const totalPhotos = await Photo.find({}).countDocuments();

    const photos = await Photo.find({})
    .sort('-dateCreated') 
    .skip((page-1) * photoPerPage)
    .limit(photoPerPage);
    
    res.render('index', { // Render index page with photos
        photos: photos,
        current : page, 
        pages : ( totalPhotos / photoPerPage )
    });
}

exports.getAboutPage = (req, res) => {
    res.render('about');
};

exports.getAddPage = (req, res) => {
    res.render('add');
};

