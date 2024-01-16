const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    products:{type:Array,required:true},
})

const cart = mongoose.model('cart',cartSchema);

module.exports  = cart