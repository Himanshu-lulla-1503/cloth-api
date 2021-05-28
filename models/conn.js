const mongoose = require('mongoose');
module.exports=mongoose.connect(process.env.mydb1,{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false,useCreateIndex:true}).then(()=>{
    console.log("connected successfully ");
}).catch((err)=>{
    console.log(err);
});
