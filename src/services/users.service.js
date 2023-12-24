import { userManagerDB } from "../DAL/dao/mongoDao/users.dao.mongo.js";


 const findAllUserService =()=>{

    const users = userManagerDB.findAll()
    return users
}


export const findByIdServ= (id)=>{

    const userById = userManagerDB.findById(id);
    return userById;

};

const findByEmailServ =(email)=> {



    const userByEmail =  userManagerDB.findByEmail(email)
    
    return userByEmail;

};

export const createOneServ =(obj)=> {

    const createdUser =  userManagerDB.createOne(obj)
    return createdUser;

};

 const findUserByCartIdServ =(idCart)=>{

    const userByCartId = userManagerDB.findUserByCartId(idCart)

    return userByCartId
}



export{ findAllUserService, findByEmailServ, findUserByCartIdServ }