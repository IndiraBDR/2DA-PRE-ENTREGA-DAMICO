
import jwt from "jsonwebtoken";
import { objConfigEnv } from "../config/config.js"

import { CustomError } from "../errors/error.generator.js";
import { errorsMessages } from "../errors/errors.enum.js";

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

        console.log(user);

      
        if (!user) {

           // return res.status(401).json({ message: "There is no logged in user" })

            return CustomError.generateError(errorsMessages.USER_NOT_LOGGED_IN, 401)

        }

        if (roles && !roles.includes(user.roles)) {

           // return res.status(403).json({ message: "Your user does not have permissions for this action" })

            return CustomError.generateError(errorsMessages.NO_PERMISSION_FOR_THIS_ACTION, 403)

           

        }

        next();
    }

}


