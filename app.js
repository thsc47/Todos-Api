require('dotenv').config();
const express = require("express");
const dbConnect = require("./config/db.config");
const cors = require('cors')

const authRouter = require('./router/authRoute');
const todoRouter = require('./router/todoRoute');
const userRouter = require('./router/userRoute')

dbConnect();

const app = express();

app.use(express.json());
app.use(cors())
app.use('/', todoRouter)
app.use('/', authRouter)
app.use('/', userRouter)


app.listen(process.env.PORT, () => {
  console.log(`Server Running at port ${process.env.PORT}`);
});
