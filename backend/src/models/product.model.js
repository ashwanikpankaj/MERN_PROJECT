const mongoose = require('mongoose');

const productSchema  = new mongoose.Schema({
    name:{type:String, trim:true, required: true},
    rating:{type:Number,trim:true,required:true},
    price:{type:Number,trim:true,required:true},
    category:{type:String,trim:true,required:true},
    image:{type:String,trim:true,required:true},
    size:{type:Array,trime:true,required:true}
},{
    versionKey: false,
    timestamps: true,
});

const product = mongoose.model('product',productSchema);

module.exports = product;

