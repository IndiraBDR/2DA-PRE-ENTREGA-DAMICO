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


  //return res.redirect("/api/sessions/current")
   next()


}



const userReqController = (req, res) => {

  const user = req.user

  const newUserDtoRes = new UsersResponseDto(user)

  res.json({ message: newUserDtoRes })

 //return res.send({status:"success", payload:user})

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

    //IDEA DE COMO RESOLVER EL BOTON

    const passwordValdHash = await compareData(newPassword, user.password);

    if (passwordValdHash) {

          return  CustomError.generateError(errorsMessages.PASSWORD_ALREADY_EXISTS,404)


    }

    ///////


    const hashedNewPassword = await hashData(newPassword);

    user.password = hashedNewPassword;

    await user.save()

    res.status(200).json({ message: "password update" });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 
  

}


export { generateTokenController, userReqController, restaurarPasswordController }