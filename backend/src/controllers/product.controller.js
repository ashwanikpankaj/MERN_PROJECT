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

router.post('/filter',async(req,res)=>{
  try{
    const selectedFilters = req.body.filters;

    const products = await Product.find();
    const categories = await Product.distinct('category');

    const filterQuery = selectedFilters.map((el)=>{
      const {key,value} = el
      if(key==='price'){
        if(value?.length !==2) throw new Error('Please Provide correct price filter')
      return   {[key]:{$gte:value[0],$lte:value[1]}}
      }
      if(key==='category' && value?.length>0){
        if(value?.length <1) throw new Error('Please Provide correct category filter')
        return {[key]:{$in:value}}
      }
      if(key ==='rating'){
        if(value?.length !==2) throw new Error('Please Provide correct rating filter')
        return {[key]:{$gte:value[0],$lte:value[1]}}
      }
    })

   const filteredProducts  = await Product.find({ $and:filterQuery})
  const productMap = filteredProducts.reduce((acc,el)=>{
    const {category} = el
    if(acc[category]){
      return {...acc,[category]:[...acc[category],el]}
    }
    return {...acc,[category]:[el]}
  },{});


  return   res.status(200).send({status:200,products,categories,productMap})  
  }
  catch(err){
    console.log(err.message,'err')
   return  res.status(500).send({status:500,message:err?.message})
  }
})

module.exports = router;
