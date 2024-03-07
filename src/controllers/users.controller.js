import { findAllUserService, findUserByCartIdServ, updateUserServ, findByIdServ, saveUserDocumentsServ } from "../services/users.service.js";
import { CustomError } from "../errors/error.generator.js";
import { errorsMessages } from "../errors/errors.enum.js";
import UsersResponseDto from "../DAL/dtos/users-response.dto.js";
import { mongoose } from "mongoose";
import { usersModel } from "../DAL/models/users.model.js";
import { transporter } from "../nodemialer.js";


export const findAllUserController = async (req, res) => {

  //const user = req.user

  

  //res.json({ message: newUserDtoRes })


  try {

    const users = await findAllUserService()

  //const newUserDtoRes = new UsersResponseDto() 

  // const usersMapDTO = users.map(user => newUserDtoRes(user)  )

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


///////NUEVO PROY FINAL


export const updateUserAdminController = async (req, res) => {
const { userId} = req.params;

console.log('IDDDDDD',userId);

console.log("BODY", req.body.roles);

const userById = await findByIdServ(userId)

console.log('USEEEEEER', userById);

if (!userById) {
  return CustomError.generateError(errorsMessages.USER_NOT_FOUND,404)
}

if (req.body.roles === 'admin') {

  return res.status(403).json({ message: "EL ROL NO SE PUEDE CAMBIAR A ADMIN" });
  
}

try {
 
  await updateUserServ( userId, req.body);

  res.status(200).json({ message: "User update" });
} catch (error) {
  res.status(500).json({ message: error.message });
}

}
////////



export const saveUserDocumentsController = async (req, res) => {

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
}




 export const deleteInactiveUsers = async (req, res)=>{

  const users = await findAllUserService()


  let fechaLimite = new Date()

  fechaLimite.setTime(fechaLimite.getTime() - (2*60*1000))


  const activeUsers = users.filter(item=>item.last_connection.getTime()>= fechaLimite.getTime())

  const inactiveUsers= users.filter(item=>item.last_connection.getTime()<= fechaLimite.getTime())

  console.log('ACTIVE USER:', activeUsers);
  console.log('INACTIVE USER:', inactiveUsers);

 

inactiveUsers.forEach(item => {

   transporter.sendMail({

    from:  "INDIRA",
    to: item.email,
    subject: "USURIO INACTIVO ELIMINADO",
    html:
  
    ` 
    <p>SU USUARIO FUE ELIMINADO YA QUE NO SE HA CONECTADO EN LOS ULTIMOS 2 DIAS</p>
    
    `
   })
  
});

 

  usersModel.deleteMany({ last_connection: { $lt: fechaLimite } }, (err) => {
    if (err) return console.error(err);
    console.log('Usuarios que no se han conectado en los últimos 2 minutos eliminados.');
  });


  return res.status(400).json({ message: "YEEEES",activeUsers });




 }