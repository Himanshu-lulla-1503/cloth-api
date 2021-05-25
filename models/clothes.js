const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const clotheschema = new  mongoose.Schema({
    Clothname:{
        type:String,
        required:true,

    },
    Cloth_id:{
        type:mongoose.ObjectId,
        required:true,
        unique:true

    },
    Category:{
        type:String,
        required:true
    },
    Brand:{
        type:String,
        required:true
    },
    TargetUser:{
        type:String,
        required:true
    },
    Price:{
        type:Currency,
        required:true

    },
    Available_colors:{
        type:[String],
        default:undefined
    },
    Available_sizes:{
        type:[String],
        default:undefined
    },
    Image:{
        type:String,
        required:true
    },
},{
    timestamps:true
});


const clothmodel= mongoose.model('clothmodelapp',clotheschema);
module.exports=clothmodel;