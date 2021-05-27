const mongoose= require('mongoose');
const express = require('express');
const jwt =require('jsonwebtoken');
const Router = express.Router();
const bcrypt= require('bcrypt');
const authenticateadmin=require('../authentication/authenticateadmin');
Router.use(express.json());
Router.use(express.urlencoded({extended:false}));
const User = require('../models/User');


//signup route of user 
Router.route('/signup')
.post(async(req,res,next)=>{
    try{
        let {email,password,admin}=req.body;
        password=await bcrypt.hash(password,10);
        const userdata=await User.create({
            email:email,
            password:password,
            admin:admin
        });
        res.json({"status":"User Registered successfully"});
    }
    catch(err){
        console.log(err);
        next(err);
    }
});


//login route of users
Router.route('/login')
.post((req,res,next)=>{
        User.findOne({email:req.body.email}).then((result)=>{
        if(!result){
            res.statusCode=401;
            res.json({"error":"No such user exists"});
        }
        else{
            bcrypt.compare(req.body.password,result.password,(err,flag)=>{
                if(flag){
                    const token=jwt.sign({email:result.email,admin:result.admin},process.env.mysecret,{expiresIn:"1h"});
                    res.json({"status":"logged in successfully","token":`${token}`});
                }
                else{
                    res.statusCode=401;
                    res.json({"Error":"Invalid credentials"});
                }

            });
           
        }
        }).catch((err)=>{
            console.log(err);
            next(err);
        })

});
//users route only admin can access to view all users or delete all users
Router.route('/')
.get(authenticateadmin,(req,res,next)=>{
    User.find({},{_id:false,__v:false}).then((result)=>{
        if(result.length<1){
            res.json({"error":"No Users found"});
        }
        else{
            res.json(result);
        }
       
    }).catch((err)=>{
        console.log(err);
        next(err);
    })
})
.delete(authenticateadmin,(req,res,next)=>{
    User.deleteMany().then((result)=>{
        console.log(`deleted count of documents from collection is ${result.deletedCount}`);
        res.setHeader('Content-Type','application/json');
        res.json({"Deleted Count of documents":result.deletedCount,"Deleted Documents":result});
    }).catch((err)=>{
        console.log(err);
        next(err);
    });

});




module.exports=Router;