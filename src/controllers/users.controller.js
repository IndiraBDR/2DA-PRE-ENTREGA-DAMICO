import { findAllUserService, findUserByCartIdServ, updateUserServ, findByIdServ, saveUserDocumentsServ, deleteUserServ, deleteInactiveUsersServ } from "../services/users.service.js";
import { CustomError } from "../errors/error.generator.js";
import { errorsMessages } from "../errors/errors.enum.js";
import UsersResponseDto from "../DAL/dtos/users-response.dto.js";
import { mongoose } from "mongoose";
import { usersModel } from "../DAL/models/users.model.js";
import { transporter } from "../nodemialer.js";


export const findAllUserController = async (req, res) => {

  try {

    const users = await findAllUserService()

    const usersMapDTO = users.map(user => UsersResponseDto.fromModel(user))
    console.log(usersMapDTO);

    res.status(200).json({ message: "users total", usersMapDTO });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}


export const findUserByCartIdController = async (req, res) => {

  const { idCart } = req.params

  try {
    const userByIdCart = await findUserByCartIdServ(idCart)

    if (!userByIdCart) {

      CustomError.generateError(errorsMessages.USER_NOT_FOUND, 404)

    }

    const email = userByIdCart.email

    res.status(200).json({ message: "userEmail", email });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}


export const updateUserController = async (req, res) => {

  const { idUser } = req.params;

  const userById = await findByIdServ(idUser)

  if (!userById) {
    return CustomError.generateError(errorsMessages.USER_NOT_FOUND, 404)
  }

  if (req.body.roles === 'admin') {

    return res.status(403).json({ message: "EL ROL NO SE PUEDE CAMBIAR A ADMIN" });

  }

  try {

    const documentsController = userById.documents
    const dni = documentsController.find((item) => item.name === 'dni')
    const address = documentsController.find((item) => item.name === 'address')
    const bank = documentsController.find((item) => item.name === 'bank')


    if (userById.roles === "user") {

      if (!dni || !address || !bank) {
        return res.status(400).json({ message: "All documents are required paracambiar a premium" });
      } else {

        await updateUserServ(idUser, req.body);

        return res.status(200).json({ message: "User update" });


      }

    }

    await updateUserServ(idUser, req.body);

    res.status(200).json({ message: "User update" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }


}


///////NUEVO PROY FINAL VOLVER A PROBAR DE ACA EN ADELANTE AREGUE TRY CHATC


export const updateUserAdminController = async (req, res) => {

  const { userId } = req.params;
  const userById = await findByIdServ(userId)

  if (!userById) {
    return CustomError.generateError(errorsMessages.USER_NOT_FOUND, 404)
  }


  try {
    if (!req.body) {

      await updateUserServ(userId, userById.roles);

      return res.status(200).json({ message: "XDDD" });

    }
    await updateUserServ(userId, req.body);

    res.status(200).json({ message: "User update" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}


export const deleteUserAdminController = async (req, res) => {

  try {

    const { userId } = req.params;

    await deleteUserServ(userId);

    return res.status(200).json({ message: "USER DELETED" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }


}

////////



export const saveUserDocumentsController = async (req, res) => {

  try {

    const { id } = req.params

    const { dni, address, bank } = req.files

    if (dni && address) {

      updateUserServ(id, { status: "loaded-dni-address" });

    } else {

      return res.status(400).json({ message: "All fields are required" });

    }


    if (dni && address && bank) {

      updateUserServ(id, { status: "completed-documents" });

    }


    const response = await saveUserDocumentsServ({ id, dni, address, bank })
    res.json({ response })

  } catch (error) {

    res.status(500).json({ message: error.message });

  }


}




export const deleteInactiveUsersController = async (req, res) => {

  try {

    const resultActiveUsers = await deleteInactiveUsersServ()

    return res.status(200).json({ message: "Active Users", resultActiveUsers });

  } catch (error) {
    res.status(500).json({ message: error.message });

  }


}