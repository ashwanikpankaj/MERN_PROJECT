const express = require('express');
const cors = require('cors');

 const productController = require("./controllers/product.controller");

const app = express();

app.use(express.json({extended: false}));
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

 app.use("/",productController);
 app.use("/create",productController);
 app.use("/product-update",productController);


module.exports  = app;