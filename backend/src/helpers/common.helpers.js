const jwt  =require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const getNewToken  = (user)=>{
  return jwt.sign({user},process.env.JWT_PRIVATE_KEY)
}

const updateItemCountIfPresent = (products = [], newAddedProducts = []) => {
  const newProduct = newAddedProducts?.[0];
   let isPresent = false;

  const allProducts = products?.map((el) => {
    if (el?._id === newProduct?._id) {
      isPresent = true
      const updatedItem = { ...el, count: (el.count || 0) + 1 };
      return updatedItem;
    }
    return el;
  });

  return isPresent? allProducts:[...products,{...newProduct,count:1}];
};

module.exports = {getNewToken, updateItemCountIfPresent}
