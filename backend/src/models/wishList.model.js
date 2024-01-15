const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    products:{type:Array,required:true}
})

const wishList = mongoose.model('wishList',wishListSchema);

module.exports  = wishList