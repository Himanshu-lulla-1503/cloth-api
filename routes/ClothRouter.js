const express= require('express');
const mongoose = require('mongoose');
const Router = express.Router();
Router.use(express.json());
Router.use(express.urlencoded({extended:false}));
const cloth = require('../models/clothes');
const authenticate=require('../authentication/authenticate');
const multer=require('multer');
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads');
    },
    filename:(req,file,cb)=>{
        cb(null, new Date().toISOString().replace(/[-T:\.Z]/g, "") + file.originalname);
    }
});

const upload=multer({storage:storage});
//Route to /clothes
Router.route('/')
.get((req,res,next)=>{
    cloth.find({},{_id:false,__v:false}).then((result)=>{
        if(result.length<1){
            res.json({"error":"no clothes found"});
        }
        else{
            res.json(result);
        }
       
    }).catch((err)=>{
        console.log(err);
        next(err);
    })
})
.post(authenticate,upload.single('clothImage'),(req,res,next)=>{
    cloth.create({
        Clothname:req.body.clothname,
        Cloth_id: new mongoose.Types.ObjectId(),
        Category:req.body.category,
        Brand:req.body.brand,
        TargetUser:req.body.targetuser,
        Price:req.body.price,
        Available_colors:req.body.colors,
        Available_sizes:req.body.sizes,
        Image:req.file.path
    }).then((result)=>{
        res.json({"status":"cloth added successfully","Added Product details":result});
    }).catch((err)=>{
        console.log(err);
        next(err);
    });

})
.put(authenticate,(req,res,next)=>{
    res.statusCode=403;
    res.json({"Error":"Put Operation not supported on entire colthes try selecting cloth by id to update"});

})
.delete(authenticate,(req,res,next)=>{
    cloth.deleteMany().then((result)=>{
        console.log(result);
        console.log(`deleted count of documents from collection is ${result.deletedCount}`);
        res.setHeader('Content-Type','application/json');
        res.json({"Deleted Count of documents":result.deletedCount,"Deleted Documents":result});
    }).catch((err)=>{
        console.log(err);
        next(err);
    });

});
//Route to Indiviual IDs as params
Router.route('/:clothId')
.get((req,res,next)=>{
    cloth.findOne({Cloth_id:req.params.clothId},{_id:false,__v:false}).then((result)=>{
        if(!result){
            res.statusCode=200;
            res.json({"error":`no clothes exist with ${req.params.clothId} id}`});
        }
        else{
            res.json({"Found Product":result});
        }
       
    }).catch((err)=>{
        console.log(err);
        next(err);
    })
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.json({'error':`Post operation not supported on /${req.params.clothId} endpoint try posting it on /clothes endpoint`});
})
.put(authenticate,(req,res,next)=>{
    cloth.findOneAndUpdate({Cloth_id:req.params.clothId},{
        $set:req.body
    },{new:true}).then((result)=>{
        console.log(result);
        res.json({"Updated Product":result});
    }).catch((err)=>{
        console.log(err);
        next(err);
    })

})
.delete(authenticate,(req,res,next)=>{
    cloth.findOneAndDelete({Cloth_id:req.params.clothId}).then((result)=>{
        console.log(result);
        res.json({"Deleted Product details":result});
    }).catch((err)=>{
        console.log(err);
        next(err);
    })

    
})
module.exports=Router;
