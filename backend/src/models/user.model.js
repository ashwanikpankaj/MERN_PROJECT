const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    password:{type:String,required:true,trim:true,minLength:6},
    mobile:{type:Number,required:true,trim:true},
},{
    timestamps:true,
    versionKey:false
}
)


const user = mongoose.model('user',userSchema);
module.exports = user;