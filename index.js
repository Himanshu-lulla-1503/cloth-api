const express= require('express');
const app = express();
const portno =process.env.PORT || 1503;
require('dotenv').config();
const connection = require('./models/conn');
const Userroute=require('./routes/UserRouter');
const Clothesroute=require('./routes/ClothRouter');
//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    next();
  });
//Routing of /users endpoint to UserRouter.js file
app.use('/users',Userroute);
//Routing of /clothes endpoint to ClothesRouter.js file
app.use('/clothes',Clothesroute);

//For Accessing uploads folder images

app.use('/uploads',express.static('uploads'));

//Error handler

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({"error":err.message});
});
app.listen(portno,()=>{
    console.log(`server running at port ${portno}`);
});