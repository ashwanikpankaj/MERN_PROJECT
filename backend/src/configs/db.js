const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

dotenv.config()

const connect = ()=> mongoose.connect(`mongodb+srv://ashnit8294:${process.env.PASSWORD}@cluster0.qrxgrtz.mongodb.net/?retryWrites=true&w=majority`)

module.exports = connect;