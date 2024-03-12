import { hashData, compareData, generateToken } from "../utils/utils.js";
import { findByEmailServ,updateUserServ } from "../services/users.service.js";
import UsersResponseDto from "../DAL/dtos/users-response.dto.js";
import { CustomError } from "../errors/error.generator.js";
import { errorsMessages } from "../errors/errors.enum.js";
import  {transporter } from "../nodemialer.js";

const generateTokenController = (req, res) => {

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

const userReqController = (req, res) => {

  const user = req.user

  const newUserDtoRes = new UsersResponseDto(user)

  res.json({ message: newUserDtoRes })


}

const signoutController = async (req, res) => {
  
  const {_id} = req.user;
  updateUserServ(_id, {last_connection:new Date()});
   res.clearCookie("token")
   res.redirect("/api/views/login")
  
}

const restaurarPasswordController = async (req, res) => {

 
  const { email, newPassword } = req.body

  if (!email || !newPassword) {

    return res.status(400).json({ message: "Faltan datos requeridos" });

  }



  try {
    const user = await findByEmailServ(email);

    if (!user) {
      return res.redirect("/api/views/signup")
    }


    const passwordValdHash = await compareData(newPassword, user.password);

    if (passwordValdHash) {

          return  CustomError.generateError(errorsMessages.PASSWORD_ALREADY_EXISTS,404)


    }

  
    const hashedNewPassword = await hashData(newPassword);

    user.password = hashedNewPassword;

    await user.save()

    res.status(200).json({ message: "password update" });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 
  

}

const sendMailRestPasswordController = async (req, res) => {

  const { email} = req.body

  try {

    await transporter.sendMail({

      from:  "INDIRA",
      to: email,
      subject: "MAIL DE RECUPERACION DE CONTRASEÑA",
      html:

      `
      <button><a href="http://localhost:8080/api/views/restaurarPassword" target="_blank">RESTAURAR PASSWORD</a></button>
      
      <p>Si el boton gno funciona, copia y pega la siguiente URL en tu navegador:</p>
      <p>http://localhost:8080/api/views/restaurarPassword</p>
      
      `

     })
     
     const tokencito = generateToken({email})    
     res.cookie('tokencito', tokencito, { maxAge: 3600000, httpOnly: true })


     res.status(200).json({ message: "MAIL ENVIADO" });
  
   
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }


}


export { generateTokenController, userReqController, restaurarPasswordController,signoutController,sendMailRestPasswordController }