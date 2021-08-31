const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const Clothes = require('./models/cloths')

mongoose.connect('mongodb://localhost:27017/fash',{
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

app.get('/fash',async(req,res)=>{
    const cloths = new Clothes({
        title: 'Shirt'})
        await cloths.save()
    res.send(cloths)
})
app.listen(8080,()=>{
    console.log("LISTENING ON PORT 8080")
})