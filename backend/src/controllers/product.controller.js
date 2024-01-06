const express = require("express");
const Product = require("../models/product.model");
const ControllerHelpers = require("./helpers.controllers")
const router = express.Router();

router.get("/all-product", async (req, res) => {
  try {
    const products = await Product.find();
    const categories = await Product.distinct('category');

    const productMap = await ControllerHelpers.getAllProductMap(categories,Product);
 
    res.status(200).send({ status: 200, products,categories,productMap });
  } catch (err) {
    res.status(500).send({ status: 500, message: err,hello:'good' });
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
