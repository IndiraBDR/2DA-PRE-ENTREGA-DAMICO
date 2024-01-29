
import jwt from "jsonwebtoken";
import { objConfigEnv } from "../config/config.js"

const SECRETJWT = objConfigEnv.secret_jwt;


/*
export const authMiddleware = (roles) => {
  return (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1]; // Verifica el header Authorization
    


    if (!token && req.cookies) {
      token = req.cookies.token; // Verifica las cookies en busca del token
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, SECRETJWT);

      console.log("HOLA DECODED", decoded);
      req.user = decoded;

     
     // console.log("ROOOOOL", req.user.roles );

      if (roles && !roles.includes(req.user.roles)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'AYAYAYAYYAYA Unauthorized' });
    }
  };
};



*/



// MIOOOO
export const authMiddleware = (roles) => {

    return (req, res, next) => {

        const user = req.user;

        

        if (!user) {

            return res.status(401).json({ message: "There is no logged in user" })

        }

        if (roles && !roles.includes(user.roles)) {

            return res.status(403).json({ message: "Your user does not have permissions for this action" })

        }

        next();
    }

}


