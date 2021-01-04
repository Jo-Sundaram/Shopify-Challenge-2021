const express = require("express");
const User = require('../models/User.model');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const checkAuthenticated = require('../config/auth');
const jwt = require("jsonwebtoken");


// Register 
router.post("/register", (req,res)=>{
    const {email, password,name} = req.body;

    bcrypt.hash(password, 10).then(function(hash) {
        
        const newUser = new User({
            email: email,
            password: hash,
            name: name
        });
        
        newUser.save(function(err){
            if(err){
                // check for duplicate emails
                if (err.name === 'MongoError' && err.code === 11000) {
                    return res.status(400).send({ success: false, message: 'User/Email already exists!' });
                }
            }
            res.status(200).send(newUser);
        });
    });
       
});


// Login
router.post('/login',(req,res,next) =>{
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/ping',

    }, (err,user)=>{
        //  sign token
        if(user){
            req.login(user, () => {
                const body = {_id: user.id, email: user.email }
                const token = jwt.sign({user: body}, "jwt_secret")
                return res.json({token})
            })
        }else if(!user || err){
            return res.status(400).send("Login unsuccessful");
        }

    })(req,res,next);
}); 


// Logout
router.post('/logout',passport.authenticate("jwt", { session: false }),(req, res) => {
    console.log("logout");
    if(!req.user){
        return res.sendStatus(400);
    }
    req.logOut()
    res.sendStatus(200);
})


module.exports = router;