import { findAllUserService, findUserByCartIdServ } from "../services/users.service.js";

export const findAllUserController = async (req, res) => {

  try {
    const users = await findAllUserService()

    res.status(200).json({ message: "users total", users });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}


export const findUserByCartIdController = async (req, res) => {

  const { idCart } = req.params

  try {
    const userByIdCart = await findUserByCartIdServ(idCart)

    const email = userByIdCart.email

    res.status(200).json({ message: "userEmail", email });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}