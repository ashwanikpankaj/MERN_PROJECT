const express = require("express");
const cors = require("cors");
const dotenev = require("dotenv");
const connect = require('./configs/db');
dotenev.config();

const productController = require("./controllers/product.controller");
const userController = require("./controllers/user.controller");
const cartController = require("./controllers/cart.controller");
const wishListController = require("./controllers/wishList.contoller");
const addressController = require("./controllers/address.controller");
const myOrderController = require("./controllers/myOrder.controllers");

const app = express();

app.use(express.json({ extended: false }));
// app.use(
//   cors({
//     origin: ["https://mernprojectfrontend-six.vercel.app/"],
//     methods: ["POST", "GET", "PATCH", "DELETE"],
//     credentials: true,
//   })
// );
//app.use(cors({origin: 'http://localhost:3003', credentials: true}));

const corsOptions = {
  origin: 'https://mernprojectfrontend-six.vercel.app/',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://mernprojectfrontend-six.vercel.app/');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});



app.use("/", productController);
app.use("/create", productController);
app.use("/product-update", productController);
app.use("/product", productController);
app.use("/user", userController);
app.use("/", cartController);
app.use("/", wishListController);
app.use("/", addressController);
app.use("/", myOrderController);

app.get('/home', (req, res) => {
    res.status(200).json('Welcome, your app is working well');
  })

const port = process.env.PORT_NUMBER || 8000;

app.listen(port,async ()=>{
    console.log('Hello I am server and I am running well and good',port);
     await connect();
})


module.exports = app;
