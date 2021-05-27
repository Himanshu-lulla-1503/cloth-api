const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
},{bufferCommands:false})

module.exports=mongoose.model('User',userschema);