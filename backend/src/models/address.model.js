const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    city:{type:String,required:true,trim:true},
    address:{type:String,required:true,trim:true},
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
})

const address = mongoose.model('address',addressSchema);

module.exports  = address;