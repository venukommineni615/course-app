import express from 'express';
const app = express();
const cors=require("cors")
import mongoose from "mongoose"
import adminRouter from "./Routes/admin"
import userRouter from "./Routes/user"
require('dotenv').config()
app.use(cors());
app.use(express.json());
app.use("/admin",adminRouter)
app.use("/users",userRouter)
console.log(process.env.mongoURI)
mongoose.connect(process.env.mongoURI,{})
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
})