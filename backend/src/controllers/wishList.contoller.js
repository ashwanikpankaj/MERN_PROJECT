const express = require('express');
const router = express.Router();
const WishList = require('../models/wishList.model');
const Cart = require('../models/cart.model');
const CommonHelpers = require("../helpers/common.helpers");

router.post('/',async(req,res)=>{
  try{
    const {userId,products:productsInBody} = req.body;
    const wishListItem  = await WishList.findOne({userId});
    const cartItem = await Cart.findOne({userId})

    if(!wishListItem){
    const productToWishlist = await WishList.create({userId,products:[{...productsInBody?.[0],count:1}]});
    return res.status(200).send({cartList:cartItem,wishList:productToWishlist,status:200})
    }

     const {products} = wishListItem;
     const allProducts = CommonHelpers.updateItemCountIfPresent(products,productsInBody)
    const wishListProducts = await WishList.findOneAndUpdate({userId},{$set:{products:allProducts}}, { new: true, useFindAndModify: false })
    return res.status(200).send({status:200,wishList:wishListProducts,cartList:cartItem})
  }
  catch(err){
    return res.status(500).send({message:err,status:500})
  }
})

module.exports = router