
import { userManagerDB } from "../DAL/dao/mongoDao/users.dao.mongo.js";
import { transporter } from "../nodemialer.js";


const findAllUserService = () => {

    const users = userManagerDB.findAll()
    return users
}


export const findByIdServ = (id) => {

    const userById = userManagerDB.findById(id);
    return userById;

};

const findByEmailServ = (email) => {

    const userByEmail = userManagerDB.findByEmail(email)
    return userByEmail;

};

export const createOneServ = (obj) => {

    const createdUser = userManagerDB.createOne(obj)
    return createdUser;

};

const findUserByCartIdServ = (idCart) => {

    const userByCartId = userManagerDB.findUserByCartId(idCart)
    return userByCartId
}


export const updateUserServ = (id, obj) => {

    const updatedUser = userManagerDB.updateOne(id, obj);
    return updatedUser

};


export const saveUserDocumentsServ = async ({ id, dni, address, bank }) => {

    const obj = {

        documents: [

            ...(dni ? [{
                name: "dni",
                reference: dni[0].path
            }] : []),

            ...(address ? [{
                name: "address",
                reference: address[0].path
            }] : []),

            ...(bank ? [{
                name: "bank",
                reference: bank[0].path
            }] : []),



        ]
    }


    const saveUserDocuments = userManagerDB.updateOne(id, obj);
    return saveUserDocuments

}



export const deleteUserServ = (id) => {

    const deletedUser = userManagerDB.deleteOne(id);
    return deletedUser

};




export const deleteInactiveUsersServ = async () => {

    const users = await findAllUserService()

    let fechaLimite = new Date()
    fechaLimite.setTime(fechaLimite.getTime() - (2 * 60 * 1000))


    const activeUsers = users.filter(item => item.last_connection.getTime() >= fechaLimite.getTime())
    const inactiveUsers = users.filter(item => item.last_connection.getTime() <= fechaLimite.getTime())



    inactiveUsers.forEach(item => {

        transporter.sendMail({

            from: "INDIRA",
            to: item.email,
            subject: "USUARIO INACTIVO ELIMINADO",
            html:

                ` 
    <p>SU USUARIO FUE ELIMINADO YA QUE NO SE HA CONECTADO EN LOS ULTIMOS 2 MINUTOS</p>
    
    `
        })

    });



    userManagerDB.deleteInactiveUser({ last_connection: { $lt: fechaLimite } })

    return activeUsers


}

export { findAllUserService, findByEmailServ, findUserByCartIdServ }