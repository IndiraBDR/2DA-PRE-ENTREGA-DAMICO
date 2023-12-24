import { hashData, compareData, generateToken } from "../utils.js";
import { findByEmailServ } from "../services/users.service.js";


//import { UsersResponse } from "../DAL/dtos/users-response.dto.js";


const generateTokenController = (req, res) => {

  const { name, last_name, email } = req.user

  const token = generateToken({
    name,
    last_name,
    email
  });

  console.log(token);

  res.cookie("token", token, { maxAge: 60000, httpOnly: true })

 return res.redirect("/api/sessions/current")
 //return res.redirect("/api/products")


}



const userReqController = (req, res) => {

  const user = req.user

  console.log(req);

 // const newUserDtoRes = new UsersResponse({...user})

  res.json({ message: user })

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

    const hashedNewPassword = await hashData(newPassword);

    user.password = hashedNewPassword;

    await user.save()

    res.status(200).json({ message: "password update" });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}


export { generateTokenController, userReqController, restaurarPasswordController }