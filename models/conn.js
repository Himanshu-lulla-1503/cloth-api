const mongoose = require('mongoose');
module.exports=mongoose.connect("mongodb://Himanshu1503:herobaby007%40gmail.com@cluster0-shard-00-00.mmgsa.mongodb.net:27017,cluster0-shard-00-01.mmgsa.mongodb.net:27017,cluster0-shard-00-02.mmgsa.mongodb.net:27017/himanshu?ssl=true&replicaSet=atlas-32x4w2-shard-0&authSource=admin&retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false,useCreateIndex:true}).then(()=>{
    console.log("connected successfully ");
}).catch((err)=>{
    console.log(err);
});
