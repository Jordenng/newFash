const mongoose = require('mongoose')
const Campground = require('../models/campgrounds')
const cities = require('./cities')
mongoose.connect('mongodb://localhost:27017/campgrounds',{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db = mongoose.connection
db.on("error",console.log.bind(console,"connection error"))
db.once("open",()=>{
    console.log("DB connected")
})

const seedDB = async ()=>{
    await Campground.deleteMany({})
    for (let i=0;i<4;i++){
        const random1000 = Math.random()
    }
    const c = new Campground({title:'purple field'})
    await c.save()
}

seedDB()