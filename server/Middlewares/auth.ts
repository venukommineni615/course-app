import jwt from "jsonwebtoken"
const secretKey = "superS3cr3t1";
import {Request,Response,NextFunction} from "express"
interface user{
  username:string,
  password:string
}
export const generateJwt = (user:user) => {
  const payload = {username:user.username};
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const authenticateJwt = (req:Request, res:Response, next:NextFunction) => {
  const authHeader=req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, user) => {
      
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

