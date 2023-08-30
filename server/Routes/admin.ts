import express from "express"

import {admin,course} from "../DB/index"
import {generateJwt,authenticateJwt} from "../Middlewares/auth"
import {Request,Response,NextFunction} from "express"
const router=express.Router()
interface user{
  username:string,
  password:string
}
router.get('/get/me',authenticateJwt,async(req:Request,res:Response)=>{
    let admins=await admin.findOne({username:req.headers.username}) 
    res.json({ admins });
  
  })
  router.post('/signup', async(req:Request, res:Response) => {
    const {username,password} = req.body;
    const existingAdmin = await admin.findOne({username});
    if (existingAdmin) {
      res.status(403).json({ message: 'Admin already exists' });
    } else {
      let newAdmin=new admin({username,password})
      await newAdmin.save()
      if (newAdmin && newAdmin.username && newAdmin.password){
        const token = generateJwt({
          username:newAdmin.username,
          password:newAdmin.password
        });
        res.json({ message: 'Admin created successfully', token });
      }
    }
  });
  
  router.post('/login', async(req:Request, res:Response) => {
    const { username, password } = req.body;
    const Admin:user|null= await admin.findOne({username,password});
    if (Admin) {
      const token = generateJwt(Admin);
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Admin authentication failed' });
    }
  });
  
  router.post('/course', authenticateJwt, async(req:Request, res:Response) => {
    let newCourse=new course(req.body);
    await newCourse.save()
    res.json({ message: 'Course created successfully', courseId:newCourse.id});
  });
  
  router.put('/courses/:courseId', authenticateJwt, async(req:Request, res:Response) => {
    const Course = await course.findByIdAndUpdate(req.params.courseId,req.body,{new:true});
    if (Course) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
  router.get('/courses', authenticateJwt, async(req:Request, res:Response) => {
  let courses=await course.find({}) 
    res.json({ courses });
  });
  router.get('/course/:courseId',authenticateJwt,async(req:Request, res:Response)=>{
    const Course= await course.findById(req.params.courseId);
    if(Course){
      res.json(Course)
    }
    else{
      res.json({msg:'The course is not existed'})
    }
  })
  
  export default router