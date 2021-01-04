const express = require("express");
const Image = require('../models/Image.model');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const passport = require('passport');
const checkAuthenticated = require("../config/auth");


// TODO hash names, deal with file extensions, ensure proper error responses
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
});


const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    // limits:{
    //     fileSize: 1024 * 1024
    // }


});


// Upload
router.post('/upload', upload.array('file', 10),passport.authenticate("jwt", { session: false }), (req, res)=> {
    if(!req.user){
		return res.status(401).send("Unauthorized");
    }

    let valid = [];
    let result = [];

    req.files.forEach(file=>{
        let ext = path.extname(file.originalname);
        if(ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
            valid.push(file);
        }
        
    });


    valid.forEach(file =>{
        
        var new_img = new Image();
        new_img.img.data = fs.readFileSync(file.path)
        new_img.img.contentType =file.mimetype;
        new_img.name = file.originalname;
        new_img.user = req.user;
        new_img.authorName = req.user.name;
        new_img.visibility = req.body.visibility;
    
        new_img.save();
       
        console.log(new_img.name);
        console.log(new_img.user);

        result.push({
            name:new_img.name, 
            id:new_img._id,
            visibility: new_img.visibility,
            author:  new_img.authorName
        });

    });
 
    console.log(result);
    res.status(200).send(result);

});


// Delete
router.delete('/delete', passport.authenticate("jwt", { session: false }), (req,res)=>{
    if(!req.user){
		return res.status(401).send("Unauthorized");
    }
    let path = './uploads/' + req.body.name;
    
    Image.deleteOne({_id: req.body.id}, (err)=>{
        if(err){
            return res.status(400).send("Could not remove image");
        }

        fs.unlink(path, (err) => {
            if (err) {
              console.error(err)
            }
        
            res.sendStatus(200);
        });
    });
});


// Get all files
// include filter in request body: 1 for public files, 0 for private files, no filter for all files
router.get('/get', passport.authenticate("jwt", { session: false }),(req,res)=>{
    if(!req.user){
		return res.status(401).send("Unauthorized");
    }

    let result = [];
    let filter = req.query.filter==1 ? {visibility:1} : req.query.filter==0 ? {visibility:0} : {}

    Image.find(filter, function(err, images) {
        if(err){
            return res.status(500);
        }

        images.forEach(image=>{
                result.push({
                    name:image.name, 
                    id:image._id,
                    visibility: image.visibility,
                    user: image.authorName,
                });
        })
        return res.status(200).send(result);
    });
    
});


// Get file by _id
router.get('/get/:file', passport.authenticate("jwt", { session: false }),(req,res)=>{
    if(!req.user){
		return res.status(401).send("Unauthorized");
    }

    Image.find({_id: req.params.file}, function(err, image) {
        if(err){
            return res.status(500);
        }
        res.contentType(image[0].img.contentType);
        res.status(200).send(image[0].img.data);
    });
    
});



// Get all files owned by user
router.get('/get-user',passport.authenticate("jwt", { session: false }),(req,res)=>{
    if(!req.user){
		return res.status(401).send("Unauthorized");
    }
    
    let result = [];
    Image.find({user:req.user}, function(err, images) {

        if(err){
            return res.status(500);
        }
        images.forEach(image=>{
            result.push({
                name:image.name, 
                id:image._id,
                visibility: image.visibility
            });
        })

        return res.status(200).send(result);
    });

});



module.exports = router;