const mongoose = require('mongoose');
//Schema

const restSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'userName is Required']
    },
    codee:{
        type:String,
        required:[true,"code is Required"]
    },
    time:{
        type:String
    },
    ratingCount:{
        type:String
    },
    imageUrl:{
        type:String
    },
    pickup:{
        type:Boolean,
        default:true
    },
    delivery:{
        type:Boolean,
        default:true
    },
    isOpen:{
        type:Boolean,
        default:true
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5
    },
    coords:{
        id:{type:String},
        latitude:{type:Number},
        longitude:{type:Number},
        latitudeDelta:{type:String},
        longitudeDelta:{type:String},
        title:{type:String}
    }
},{timestamps:true});

module.exports = mongoose.model('Resturant', restSchema);