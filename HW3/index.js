var Express = require("express");
var Mongoclient=require("mongodb").MongoClient;
var cors=require("cors");
const multer=require("multer")

var app=Express();
app.use(cors());
var CONNECTON_STRING="mongodb+srv://mason45ok:%40Mason45ok@testdb.wgzvgzj.mongodb.net/?retryWrites=true&w=majority";
var DATABASENAME="testDB";
var database;
app.listen(5038,()=>{
    Mongoclient.connect(CONNECTON_STRING,(error,client)=>{
        database=client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful");
    })
})
