const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const Campground = require('./models/campgrounds')
const morgan = require('morgan')

app.use(morgan('tiny'))

app.use((req,res,next)=>{
    console.log("hello")
    next();
})
mongoose.connect('mongodb://localhost:27017/campgrounds',{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db = mongoose.connection
db.on("error",console.log.bind(console,"connection error"))
db.once("open",()=>{
    console.log("DB connected")
})

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.render('home')
})

// app.get('/dogs',(req,res)=>{
//     res.render('home')
// })
app.get('/campgrounds',async(req,res)=>{
    const campground = new Campground({
        title: 'Shirt'})
        await campground.save()
    res.send(campground)
})
app.listen(3000,()=>{
    console.log("LISTENING ON PORT 8080")
})