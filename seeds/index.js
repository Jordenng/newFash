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
    for (let i=0;i<50;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const camp = new Campground({
            image: 'https://source.unsplash.com/collection/5116602\n',
            price: 10

        })
        await camp.save();
    }

}

seedDB().then(()=>{
    mongoose.connection.close();
})