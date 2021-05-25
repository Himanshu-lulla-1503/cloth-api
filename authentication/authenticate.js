const jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{
    if(!req.headers.authorization){
        res.statusCode=401;
        res.json({"Error":"You are not authenticated","request":{
            type:"POST",
            link:"http://localhost:1503/users/login"
        }});
    }
    else{
        const token=req.headers.authorization.split(' ')[1];
        jwt.verify(token,process.env.mysecret,(err,decoded)=>{
            if(err){
                res.statusCode=401;
                res.json({"error":err.message});
            }
            else{
                next();
            }
            
        });
    }
}