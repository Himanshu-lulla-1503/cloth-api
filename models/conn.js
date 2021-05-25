const mongoose = require('mongoose');
module.exports=mongoose.connect(process.env.mydb,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
    console.log("connected successfully ");
}).catch((err)=>{
    console.log(err);
});
