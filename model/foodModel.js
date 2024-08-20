const mongoose = require('mongoose');

const foodSchema =new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Fdod Title is Required']
    },
    description:{
        type:String,
        required:[true,'Description is Required']
    },
    price:{
        type:Number,
        required:[true,'Food Price is Required']
    },
    foodTags:{
        type:String
    },
    ratingCount:{
        type:String
    },
    category:{
        type:String
    },
    code:{
        type:String
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5
    },
    imageUrl:{
        type:String,
        default:'https://t3.ftcdn.net/jpg/02/41/30/72/360_F_241307210_MjjaJC3SJy2zJZ6B7bKGMRsKQbdwRSze.jpg'
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Resturant'
    }

},{timestamps:true});

module.exports = mongoose.model('Food', foodSchema);