const express = require("express");
const router = express.Router();
const Address = require("../models/address.model");

router.post("/address", async (req, res) => {
  try {
    const address = await Address.create(req.body);
    return res.status(200).send({ address, status: 200, userId: req?.userId });
  } catch (err) {
    return res.status(500).send({ message: err, status: 500 });
  }
});

router.get("/address/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const address = await Address.findOne({ userId: id }).lean();
    return res.status(200).send({ address, status: 200, userId: id });
  } catch (err) {
    return res.status(500).send({ message: err, status: 500 });
  }
});

router.post('/update-address',async(req,res)=>{
  try{
   const {city,address,userId} = req.body
   const updatedAddress = await Address.findOneAndUpdate({userId}, { $set: { city,address,userId } },
    { new: true, useFindAndModify: false });
    return res.status(200).send({ address:updatedAddress, status: 200,userId });
  }
  catch(err){
    return res.status(500).send({ message: err, status: 500 });
  }
})

module.exports = router;