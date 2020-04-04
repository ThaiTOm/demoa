var db = require("../db");
const cookieParser = require('cookie-parser')
module.exports.midOuth = function(req,res,next){
    if(!req.signedCookies.userId){
        res.redirect("/users/login");
        return 
    };
    var user = db.get("users")
                 .find({name: req.signedCookies.Uname})
                 .value();
    if(user){
        res.redirect("/users/login");
        return
    };
    next();    
}