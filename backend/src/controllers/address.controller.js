const express = require("express");
const router = express.Router();
const Address = require("../models/address.model");

router.post("/address", async (req, res) => {
  try {
    const address = await Address.create(req.body);
    return res.status(500).send({ address, status: 200, userId: req?.userId });
  } catch (err) {
    return res.status(500).send({ message: err, status: 500 });
  }
});

router.get("/address/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const address = await Address.findOne({ userId: id }).lean();
    return res.status(500).send({ address, status: 200, userId: id });
  } catch (err) {
    return res.status(500).send({ message: err, status: 500 });
  }
});

module.exports = router;