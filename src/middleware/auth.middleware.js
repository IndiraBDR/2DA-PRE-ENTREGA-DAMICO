
//import jwt from "jsonwebtoken";
import { objConfigEnv } from "../config/config.js"
import { CustomError } from "../errors/error.generator.js";
import { errorsMessages } from "../errors/errors.enum.js";

const SECRETJWT = objConfigEnv.secret_jwt;


export const authMiddleware = (roles) => {

    return (req, res, next) => {

        const user = req.user;

        console.log("authMiddleware",user);

    

        if (roles && !roles.includes(user.roles)) {

           // return res.status(403).json({ message: "Your user does not have permissions for this action" })

            return CustomError.generateError(errorsMessages.NO_PERMISSION_FOR_THIS_ACTION, 403)

           

        }

        next();
    }

}


