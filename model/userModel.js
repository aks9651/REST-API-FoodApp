const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'userName is Required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'password is required']
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        required:[true,'phone is required']
    },
    usertype:{
        type:String,
        required:[true, 'usertype is required'],
        default:'client',
        enum:['client','admin','driver','vendor']
    },
    profile:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s'
    }
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);