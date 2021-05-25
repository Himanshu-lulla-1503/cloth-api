const express= require('express');
const app = express();
const portno =process.env.PORT || 1503;
require('dotenv').config();
const connection = require('./models/conn');
const Userroute=require('./routes/UserRouter');
const Clothesroute=require('./routes/ClothRouter');
app.use('/users',Userroute);
app.use('/clothes',Clothesroute);


//Error handler
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({"error":err.message});
});
app.listen(portno,()=>{
    console.log(`server running at port ${portno}`);
});