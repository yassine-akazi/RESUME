const { response } = require("express");
const express = require("express")
const app = express()
const User = require("./Module/User");
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

app.set("view engine", "ejs")

app.use(express.static("static"))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get("/", function (req, res) {
    res.render("index")
    console.log('index is working')


})
app.get("/nun", function (req, res) {
    res.render("nun")
    console.log('login is working')
})

app.get("/login", function (req, res) {
    res.render("login")
    console.log('login is working')
})

app.post('/login', async function(req, res) {
    const { email, password } = req.body ;
    const user = await User.findOne({ email })

    if(!user){
        res.status(400).redirect("nun")
        return;
    }

    if(password !== user.password){
        res.status(400).redirect("nun")
        return;
    }

    const token = jwt.sign({ user }, "Super-secret", {
        expiresIn: "1d"
    })

    res.redirect(`tmp?token=${token}`, 301)
})

app.get("/tmp", function (req, res) {
    res.render("tmp")
    console.log('tmp is working')

})

app.get("/tmp1", function (req, res) {
    res.render("tmp1")
    console.log('tmp1 is working')


})

app.get("/tmp2", function (req, res) {
    res.render("tmp2")
    console.log('tmp2 is working')


})

app.get("/sing-up", async function (req, res) {
    res.render("sing-up")
    console.log('sing-up is working')

})

app.post('/sing-up', async function (req, res){
    const { name, email, password } = req.body;
    await User.create({
      name,
      email, 
      password
    })
    res.redirect("login", 301)
})





app.listen(8000, function () {
    console.log('App running on http://localhost:8000')
})

const uri = "process.env.mongodb_url"

mongoose.set('strictQuery', true)
mongoose.connect(uri, {}, (err, data) => {
    if(err) throw err
    console.log("Connected to Mongo DB")
})

