const express = require('express');
const cors = require('cors');

 const productController = require("./controllers/product.controller");
 const userController = require("./controllers/user.controller");
 const cartController = require("./controllers/cart.controller");
 const wishListController = require("./controllers/wishList.contoller");
 const addressController = require("./controllers/address.controller");
 const myOrderController = require("./controllers/myOrder.controllers");


const app = express();

app.use(express.json({extended: false}));
app.use(cors({origin: 'http://localhost:3003', credentials: true}));

 app.use("/",productController);
 app.use("/create",productController);
 app.use("/product-update",productController);
 app.use("/product",productController);
 app.use("/user",userController);
app.use("/",cartController)
app.use("/",wishListController);
app.use("/",addressController);
app.use("/",myOrderController)


module.exports  = app;