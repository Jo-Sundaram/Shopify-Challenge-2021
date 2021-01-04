const LocalStrategy = require('passport-local').Strategy
const passportJWT = require("passport-jwt");
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

function initialize(passport){
    const authenticateUser =  (email,password,done)=>{
       User.findOne({'email':email})
        .then(user =>{
             bcrypt.compare(password, user.password, (err,result)=>{
                 if(result){
                    console.log("Login successful");
                    return done(null,user,{message: 'success!'});
                }
                else{
                    console.log("Password incorrect");
                    return done(null, false, {message: 'Password incorrect'})
                }
            });
        }).catch(err =>{
                console.log("Login unsuccessful");

                return done(null, false, {message: 'User does not exist'})
        });
    };

    JWTStrategy = passportJWT.Strategy;
    
    const authenticateToken = (jwt_payload, done) => {
        User.findById({"_id":jwt_payload.user._id}, (err,user)=>{
            if (!user) {
                return done(null, false, {
                    message: "Token not matched"
                })
            }
            if(err){
                return done(null,false, {message: "Token not found"});
            }
            else{
                return done(null,user,{message: "Token matched"});
            }
        })
    };

    const getUserById = (id, password, done)=>{
        User.findOne({'_id':id})
        .then(user =>{
            console.log(user);
            if(user==null){
                return done(null, false, {message: 'No user with that id'})
            }   
            bcrypt.compare(password, user.password, (err,result)=>{
                console.log(result);
                if(result){
                    return done(null,user);
                }
                return done(null, false, {message: 'Password incorrect'});
            });
        });
    }

    passport.use(new JWTStrategy({jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),secretOrKey: "jwt_secret"}, authenticateToken))

    passport.use(new LocalStrategy({usernameField: 'email'},authenticateUser));

    passport.serializeUser((user,done) =>done(null,user.id));
    passport.deserializeUser((id,done) =>{
        return done(null,getUserById);
    });

}


module.exports = initialize;