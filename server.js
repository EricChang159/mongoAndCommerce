const express = require('express')
const app = express()
const mongoose = require('mongoose')

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//超的

const comData = require('./src/static/pros-list.json')
console.log(comData)

mongoose.connect('mongodb://user:password@192.168.1.216:2717/bac_test',{
    useNewUrlParser: true,
    useUnifiedTopology: true
},
function(err){
    if(err)throw err
        console.log('connect successful')
})



var modelSchema = mongoose.model('',new mongoose.Schema({
    id:String,
    index:Number,
    name:String,
    info:String,
    price:Number,
    imageType:String,
    picture:String
},{collection:'prodList'}))
//collection 操作會用到




var AllcollectionData;
modelSchema.find({},(err,res)=>{
    if(err)throw err
    // AllcollectionData = data
    AllcollectionData = res
})


var port = process.env.PORT || 3000
app.listen(port,function(){
    console.log(`port is listening on ${port}`)
})

app.get('/',(req,res)=>{
    res.send(AllcollectionData)
})
