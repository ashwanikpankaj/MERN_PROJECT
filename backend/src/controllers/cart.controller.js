const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');
const WishList = require("../models/wishList.model");

router.post('/add-to-cart',async(req,res)=>{
  try{
    const {userId,products:productsInBody} = req.body;
    const cartItem  = await Cart.findOne({userId});

    if(!cartItem){
    const productToCart = await Cart.create(req.body);
    return res.status(200).send({cartList:productToCart,status:200})
    }

     const {products} = cartItem;
    const cartProducts = await Cart.findOneAndUpdate({userId},{$set:{products:[...products,...productsInBody]}}, { new: true, useFindAndModify: false })
    return res.status(200).send({status:200,cartProducts})
  }
  catch(err){
    return res.status(500).send({message:err,status:500})
  }
})

router.get('/cart-and-wishlist/:id',async(req,res)=>{
    const userId  =  req.params.id
    try{
    const cartList = await Cart.findOne({userId}).lean();
    const wishList =  await WishList.findOne({userId}).lean();
    return res.status(200).send({status:200,wishList,cartList})
    }
    catch(err){
     return res.status(500).send({status:500,message:err})
    }
})

module.exports = router