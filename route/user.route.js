    var express = require("express");

    var middleWares = require("../middlewares/mid.outh.js");
    var router= express.Router();

    const cookieParser = require('cookie-parser')
    router.use(cookieParser()) // use to read format cookie
    var shortid = require('shortid');
    var multer = require("multer")
    var upload = multer({ dest: './public/uploads/' })
    var controller = require("../controllers/view.controllers");
    var db = require("../db");
    router.get("/",middleWares.midOuth, controller.index);

    router.get("/sty",controller.prod)
    router.get("/create",controller.create);

    router.post("/create", upload.single('avatar'),controller.post);

    router.get("/login",controller.login);

    router.post("/login", controller.PostLogin)

    router.get("/search",middleWares.midOuth,controller.search);

    router.get("/:id",middleWares.midOuth,controller.id);

    module.exports = router 