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
app.get('/newrest',(req,res)=>{
    res.render('admin')
})

app.post('/addRest',(req,res)=>{
    var a = req.body.mealtype
    var out = []

    a.map((data)=>{
        var val = data.split(",")
        var obj = {}
        obj.mealtype = val[0];
        obj.name = val[1]
        out.push(obj)
        return out
    })
    console.log(req.body);
})

//db connection
MongoClient.connect(mongourl,(err,client) => {
    if(err) console.log('Error while connecting')
    db = client.db('FSWDinternship');
    app.listen(port,(err)=>{
        console.log(`Server is running ${port}`)
    })
})