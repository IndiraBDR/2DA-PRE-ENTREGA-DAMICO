import passport from "passport"
import { generateToken } from "../utils/utils.js";
import { updateUserServ } from "../services/users.service.js";

export const tokenValidationMiddleware = (req, res, next) => {
    passport.authenticate('current', { session: false }, (err, user) => {
      if (err || !user) {
        // Si hay un error o el usuario no existe, redirige a la página de inicio de sesión
       // return res.redirect('/login');
     return  res.json({message:"user no logeado"})
      }
      // Si el usuario existe, agrega la información del usuario al objeto req
      req.user = user;
      return next();
    })(req, res, next);
  };
// sirve para verificar si el usuario esta loegado, que del front esta llegando token y  si existe el usurio, deja dentro req el usuario



export const generateTokenMiddleware = (req, res,next) => {

    const { name, last_name, email,roles,_id } = req.user
  
    const token = generateToken({
      name,
      last_name,
      email,
      roles,
      _id
  
    });
  
   console.log("TOKEN DE SESSION",token);
  
   if (token) {
  
    updateUserServ(_id, {last_connection:new Date()});
    
   }
  
    res.cookie("token", token, { maxAge: 60000, httpOnly: true })
  
  
     next()
  
  
  }