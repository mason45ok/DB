var express =require('express')
var server = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://mason45ok:%40Mason45ok@testdb.wgzvgzj.mongodb.net/?retryWrites=true&w=majority/est", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
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