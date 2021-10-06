const express = require('express');
const app = express();
const port = process.env.PORT || 5600;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-Parser');
const mongourl = "mongodb://localhost:27017"
let db;

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//html file path
app.set('views','./src/views')
app.set('view engine','ejs')

// add new restaurent
app.get('/newRest',(req,res)=>{
    res.render('admin')
})

app.post('/addRest',(req,res)=>{
    var mealinput = req.body.mealtype
    var mealtypeArr = []
    mealinput.map((data)=>{
        var val = data.split(",")
        var obj = {}
        obj.mealtype = val[0];
        obj.name = val[1]
        mealtypeArr.push(obj)
    })

    var cuisineinput = req.body.cuisine
    var cuisinetypeArr = []
    cuisineinput.map((data)=>{
        var val = data.split(",")
        var obj = {}
        obj.cuisine = val[0];
        obj.name = val[1]
        cuisinetypeArr.push(obj)
    })

    var body = {
        "_id":Math.floor(Math.random()*100000),
        "name":req.body.name,
        "locality": req.body.locality,
        "thumb":req.body.thumb,
        "cost": req.body.cost,
        "address": req.body.address,
        "type": mealtypeArr
    }
    res.send(body)
    
})

//db connection
MongoClient.connect(mongourl,(err,client) => {
    if(err) console.log('Error while connecting')
    db = client.db('FSWDinternship');
    app.listen(port,(err)=>{
        console.log(`Server is running ${port}`)
    })
})