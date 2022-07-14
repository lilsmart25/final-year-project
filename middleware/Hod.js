var User = require('../models/user');

module.exports = (req,res,next)=>{
    if(req.isAuthenticated() && req.user.isHod == true){
        //console.log(req.logUser);
        next()
    }else{
        res.redirect('/hod/login');
        console.log('Auth Failed');
    }

}