module.exports = (req,res,next)=>{
    if(req.isAuthenticated() && req.user.status == true){
        //console.log(req.logUser);
        next()
    }else{
        res.redirect('/staff/login');
    }

}