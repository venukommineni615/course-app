import express from 'express';
import secure from "./config"
const app = express();
const cors=require("cors")
import mongoose from "mongoose"
import adminRouter from "./Routes/admin"
import userRouter from "./Routes/user"

app.use(cors());
app.use(express.json());
app.use("/admin",adminRouter)
app.use("/users",userRouter)
mongoose.connect(secure.mongoURI,{})
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
})