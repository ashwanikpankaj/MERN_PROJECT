const mongoose = require("mongoose");

const myOrderSchema = new mongoose.Schema({
    products:{type:Array,required:true,},
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
})

const myOrder = mongoose.model('myOrder',myOrderSchema);

module.exports  = myOrder;