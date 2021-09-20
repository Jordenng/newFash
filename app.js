const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Campground = require('./models/campgrounds')
const morgan = require('morgan')
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")

mongoose.connect('mongodb://localhost:27017/campgrounds',{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db = mongoose.connection
db.on("error",console.log.bind(console,"connection error"))
db.once("open",()=>{
    console.log("DB connected")
})

const app = express()

app.engine("ejs", ejsMate)
app.use(morgan('tiny'))
app.use(methodOverride("_method"))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('home')
})


app.get('/campgrounds',async(req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
})

app.get('/campgrounds/new',(req,res)=>{
    res.render('campgrounds/new')
})

app.post('/campgrounds',async(req,res)=>{
    const campground = new Campground(req.body.campground)
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})


app.get('/campgrounds/:id',async(req,res)=>{
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {campground})
})

app.get('/campgrounds/:id/edit',async(req,res)=>{
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
})

app.put('/campgrounds/:id',async(req,res)=>{
    const campground = await Campground.findByIdAndUpdate(req.params,{...req.body.campground})
    res.redirect(`/campgrounds/${campground._id}`)
})


// const verifyPassword = ((req,res,next)=>{
//     const {password} = req.query;
//     if (password === 'chicken'){
//         next();
//     }
//     res.send("sorry you need a password")
// })
//
// app.get('/dogs',verifyPassword,(req,res)=>{
//     res.send("woof")
// })
//
// app.get('/secret',verifyPassword,(req,res)=>{
//     res.send("my secret is.. you will never know.")
// })
// app.use((req,res)=>{
//     res.status(404).send("Not Found!")
// })

app.listen(3000,()=>{
    console.log("LISTENING ON PORT 3000")
})