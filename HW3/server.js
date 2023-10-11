var express =require('express')
var server = express();
var mongoose = require('mongoose')

mongoose.connect("mongodb+srv://mason45ok:%40Mason45ok@testdb.wgzvgzj.mongodb.net/?retryWrites=true&w=majority/est"{useNewUrlParser: true, useUnifiedTopology: true},function checkDB()
{
    if(error)
    {
        console.log("error")
    }
    else
    {
        console.log("DB connected")
    }
});




server.use(express.json());

server.listen(8000,function check(error){
    if(error)
    {
        console.log("error")
    }
    else
    {
        console.log("started")
    }
});