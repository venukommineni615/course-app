import jwt from "jsonwebtoken"
require('dotenv').config();


import {Request,Response,NextFunction} from "express"
interface user{
  username:string,
  password:string
}
export const generateJwt = (user:user) => {
  const payload = {username:user.username};
  return jwt.sign(payload, process.env.secretkey, { expiresIn: '1h' });
};

export const authenticateJwt = (req:Request, res:Response, next:NextFunction) => {
  const authHeader=req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.secretkey, (err, user) => {
      
      if (err) {
        return res.sendStatus(403);
      }
      if (!user) {
        return res.sendStatus(403);
      }
      if (typeof user==="object"){
        req.headers["username"] = user.username;
        next();
      }
      
    });
  } else {
    res.sendStatus(401);
  }
};

