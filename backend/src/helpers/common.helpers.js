const jwt  =require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const getNewToken  = (user)=>{
  return jwt.sign({user},process.env.JWT_PRIVATE_KEY)
}

module.exports = {getNewToken}
