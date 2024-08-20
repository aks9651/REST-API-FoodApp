const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.MONGOURL

const connectDB=async ()=>{
    try {
        await mongoose.connect(url);
        console.log('DB Connected');
    } catch(err){
        console.log(err);
    }
}

module.exports = connectDB;