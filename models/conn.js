const mongoose = require('mongoose');
module.exports=mongoose.connect(process.env.MYDB,{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false,useCreateIndex:true}).then(()=>{
    console.log("connected successfully ");
}).catch((err)=>{
    console.log(err);
});
