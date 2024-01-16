const express = require("express");
const router = express.Router();
const MyOrder = require("../models/myOrder.model");
const Cart  =  require("../models/cart.model")

router.get("/my-order/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const myOrder = await MyOrder.findOne({userId}).lean();
    return res.status(200).send({ myOrder, status: 200, userId});
  } catch (err) {
    return res.status(500).send({ message: err, status: 500 });
  }
});

router.post("/place-order",async(req,res)=>{
    try {
      const {userId} = req.body;
      const {products=[]} = await MyOrder.findOne({userId}) || {};
        const myOrder = await MyOrder.create({userId,products:[...products,...req?.body?.products]});

        // since item is order so delete cart data from db
        await Cart.findOneAndDelete({userId})

        return res.status(200).send({ myOrder, status: 200, userId});
      } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err, status: 500 });
      } 
      
})

module.exports = router;