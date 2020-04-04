const express = require('express')
const app = express()
const port = 2105;
require("dotenv").config();
const cookieParser = require('cookie-parser')
var userRoute = require("./route/user.route.js")
const bodyParser = require('body-parser')

app.set("view engine", "pug");
app.set("views", "./views")

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser("process.env.SESSION_SECRET"));
app.use(express.static("public"));
console.log(process.env.SESSION_SECRET)
app.get('/', (req, res) => res.render("index.pug"));

app.use("/users", userRoute);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))