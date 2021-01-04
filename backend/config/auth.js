
const checkAuthenticated = function (req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    console.log("not authenticated");
    res.redirect(307,'/users/login');
}

function checkNotAuthenticated(req,res,next){
    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    next();
}

module.exports = checkAuthenticated;
