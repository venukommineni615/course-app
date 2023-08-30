import express from "express"
import {generateJwt,authenticateJwt} from "../Middlewares/auth"
import {user,course} from "../DB/index"
import {Request,Response,NextFunction} from "express"
const router=express.Router()
router.post('/users/signup', async(req:Request, res:Response) => {
    const {username,password} = req.body;
    const existingUser = await user.findOne({username});
    if (existingUser) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const User=new user({username,password});
      await User.save()
      if(User && User.username && User.password){

        const token = generateJwt({
          username:User.username,
          password:User.password
        });
        res.json({ message: 'User created successfully', token });
      }
    }
  });
  
  router.post('/users/login', async(req:Request, res:Response) => {
    const { username, password } = req.body;
    const User = await user.findOne({username,password});
    if (User && User.username && User.password ) {
      const token = generateJwt({
        username: User.username,
        password: User.password})
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'User authentication failed' });
    }
  });
  
  router.get('/users/courses', authenticateJwt, async(req:Request, res:Response) => {
      const courses=await course.find({})
      res.json({courses});
  });
  
  router.post('/users/courses/:courseId', authenticateJwt, async(req, res) => {
    const Course:any = await course.findById(req.params.courseId);
    if (course) {
      const User = await user.findOne({username:req.headers.username});
      if (User) {
        User.purchasedCourses.push(Course);
        await User.save()
        res.json({ message: 'Course purchased successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
  router.get('/users/purchasedCourses', authenticateJwt, async(req:Request, res:Response) => {
    const User = await user.findOne({username:req.headers.username}).populate("purchasedCourses")
    if (User) {
      res.json({purchasedCourses:User.purchasedCourses || []});
    } else {
      res.status(404).json({ message: "user not found" });
    }
  });
  export default router