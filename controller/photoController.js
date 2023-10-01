const fs = require('fs');
const Photo = require('../models/Photo');

exports.getPhotoPage =  async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo-page', {
        photo,
    });
};
exports.createPhoto = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res
            .status(400)
            .send(`<script>alert('No image uploaded')</script>`);
    }

    const uploadDir = __dirname +'/../public/uploads';

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let imageFile = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + imageFile.name;

    imageFile.mv(uploadPath, async (err) => {
        if (err) return res.status(500).send(err);
        await Photo.create({
            ...req.body,
            image: '/uploads/' + imageFile.name,
        }); // Adding value to mongoDB
        res.redirect('/');
    });
};

exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    photo.tittle = req.body.tittle;
    photo.description = req.body.description;
    photo.save();
    res.redirect(`/photo/${req.params.id}`);
};
exports.editPhotoPage = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('edit', {
        photo,
    });
};

exports.deletePhoto = async (req, res) => {
    const photo = await Photo.findById({_id: req.params.id});
    const imagePath = __dirname +'/../public'+ photo.image ;
    fs.unlinkSync(imagePath);
    await Photo.findByIdAndRemove(photo._id);
    res.redirect('/');
};