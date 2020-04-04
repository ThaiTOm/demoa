var express = require("express");
const cookieParser = require('cookie-parser')
var router= express.Router();
var md5 = require('md5')
var shortid = require('shortid');
var db = require("../db")


module.exports.index = function(req,res){
    res.render("inde.pug", {
        users: db.get("users").value()
    }); 
};
module.exports.create = function(req,res){
    res.render("create.pug") 
};
module.exports.login = function(req,res){
    res.render("login.pug")
};
module.exports.prod = function(req,res){
    var page = req.query.page;
    var perpage = 8;
    var begin = (page - 1) * perpage;
    var end = page  * perpage;
    var arr = []
    for(var x = 0; x< 100 / perpage; x++){
       arr.push(x);
    }
    var i = 1;
    function grow(z){
      for(var t = z; z<5;z++){
          console.log(z)
      }
    }
    res.render("in.pug",{
        products: db.get("products").value().slice(begin,end),
        begin : begin,
        end: end,
        page: arr,
        i: i,      
        grow: grow(i)
    })
}
module.exports.PostLogin = function(req,res){
    var username = req.body.Uname;
    var pass = req.body.paassword;
      var user = db.get("users")
                   .find({name : username})
                   .value();
      
    if(!user){
        res.render("login", {
            errors: ["Username is incorrect"]
        });
        return;
    };
    var hashedPass = md5(pass);

    if(user.password !== pass){    
           res.render("login", {
            errors: [" is incorrect"]
           });
      return;
    };
res.cookie("userId", user.id,{
    signed: true
});
res.redirect("/users");
}
module.exports.post = function(req, res){ 
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split("/").slice("1").join("/");
    var errors = [];
        if(!req.body.name){
            errors.push("Name is not required");
       
        }
        if(!req.body.phone){
            errors.push("Phone is not required");
        }

        if(errors.length){
            res.render("create.pug",{
                errors: errors,
                values: req.body
            })
        }
      else{
            db.get('users')
              .push(req.body)
              .write();
           res.redirect("/users") 
      }
      }

module.exports.search = function(req,res){
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(user => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render("inde.pug",{
        users: matchedUsers
    })
};
module.exports.id = function(req,res){
    var id = req.params.id;
    var user = db.get("users")
                 .find({ id: id})
                 .value();    
    res.render("view",{
        users : user
})           
}