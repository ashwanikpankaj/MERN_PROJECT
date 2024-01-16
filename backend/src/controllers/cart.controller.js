const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model");
const WishList = require("../models/wishList.model");
const CommonHelpers = require("../helpers/common.helpers");

router.post("/add-to-cart", async (req, res) => {
  try {
    const { userId, products: productsInBody } = req.body;
    const cartItem = await Cart.findOne({ userId });

    if (!cartItem) {
      const productToCart = await Cart.create({
        userId,
        products: [{ ...productsInBody?.[0], count: 1 }],
      });
      return res.status(200).send({ cartList: productToCart, status: 200 });
    }

    const { products } = cartItem;
    const allProducts = CommonHelpers.updateItemCountIfPresent(
      products,
      productsInBody
    );
    const cartProducts = await Cart.findOneAndUpdate(
      { userId },
      { $set: { products: allProducts } },
      { new: true, useFindAndModify: false }
    );
    return res.status(200).send({ status: 200, cartProducts, allProducts });
  } catch (err) {
    return res.status(500).send({ message: err, status: 500 });
  }
});

router.get("/cart-and-wishlist/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const cartList = await Cart.findOne({ userId }).lean();
    const wishList = await WishList.findOne({ userId }).lean();
    return res.status(200).send({ status: 200, wishList, cartList });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err });
  }
});

router.post("/cart-decrease-count", async (req, res) => {
  try {
    const { productId, userId } = req.body;
    const { products } = await Cart.findOne({ userId }).lean();
    const itemWithDecreasedCount = CommonHelpers.decreaseItemCount(
      products,
      productId
    );
    const updateProduct = await Cart.findOneAndUpdate(
      { userId },
      { $set: { products: itemWithDecreasedCount } },
      { new: true, useFindAndModify: false }
    );
    return res.status(200).send({ products: updateProduct });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong", status: 500 });
  }
});

module.exports = router;
