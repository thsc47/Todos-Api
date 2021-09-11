const express = require("express");
const dbConnect = require('./config/db.config');
dbConnect();

const app = express();

app.listen(5000, ()=>{console.log("Server Running at port 5000")})

