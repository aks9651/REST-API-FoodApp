const mongoose = require('mongoose');

//Schema 
const ordersSchema = new mongoose.Schema({
    foods:[{type:mongoose.Schema.Types.ObjectId,
        ref:'Food'
    }],
    payment:{},
    buyer:{ type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        enum:['preparing','prepared','on way','delivered'],
        default:'preparing'
    }
},{timestamps:true});

module.exports = mongoose.model('Order', ordersSchema);