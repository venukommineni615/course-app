import mongoose from "mongoose"
const ADMINS = new mongoose.Schema({
    username:String,
    password:String
})
const USERS = new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{type:mongoose.Schema.Types.ObjectId,ref:"course"}]

})
const COURSES = new mongoose.Schema({
    title:String,
    image:String,
    description:String,
    price:String
    
})
export const user=mongoose.model("user",USERS);
export const admin=mongoose.model("admin",ADMINS);
export const course=mongoose.model("course",COURSES);
