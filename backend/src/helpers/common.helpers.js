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

const decreaseItemCount = (products=[],productToRemoveId)=>{
  const productWithDecreasedCount  = products.map(item=>{
    if(item?._id === productToRemoveId){
      return {...item,count : item?.count-1}
    }
    return item;
  })
  const filteredProduct  = productWithDecreasedCount.filter(item=>item?.count>0);
  return filteredProduct
}

module.exports = {getNewToken, updateItemCountIfPresent, decreaseItemCount}
