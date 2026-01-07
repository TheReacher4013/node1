const express = require('express');
const  cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const carRoutes = require("./routes/carRoutes");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", carRoutes);

mongoose.connect(process.env.MONGOdb_CONNECTION_STRINGG)
    .then(() => {
        console.log("Mongodb connected");
    }).catch(error => {
        console.log("error", error);
    })

module.exports = app;

