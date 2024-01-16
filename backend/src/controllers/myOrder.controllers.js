const express = require("express");
const router = express.Router();
const MyOrder = require("../models/myOrder.model");

router.get("/my-order/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const myOrder = await MyOrder.findOne({userId}).lean();
    return res.status(500).send({ myOrder, status: 200, userId});
  } catch (err) {
    return res.status(500).send({ message: err, status: 500 });
  }
});

router.post("/place-order",async(req,res)=>{
    try {
        const myOrder = await MyOrder.create(req.body).lean();
        return res.status(500).send({ myOrder, status: 200, userId});
      } catch (err) {
        return res.status(500).send({ message: err, status: 500 });
      } 
})

module.exports = router;