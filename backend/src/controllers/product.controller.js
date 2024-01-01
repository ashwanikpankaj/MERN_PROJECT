const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();

router.get("/all-product", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ status: 200, products });
  } catch (err) {
    res.status(500).send({ status: 500, message: err });
  }
});

router.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send({ product, status: 201 });
  } catch (err) {
    res.status(500).send({ status: 500, message: err });
    console.log({ err });
  }
});

router.patch('/:id',async(req,res)=>{
    try{
         const id = req.params.id;
        const body = req.body
        const product = await Product.findByIdAndUpdate(id,body)
        res.status(200).send({product,status:200})
    }
    catch(err){
        res.status(500).send({status:500,message:err})
    }
})

module.exports = router;
