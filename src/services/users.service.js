import { userManagerDB } from "../dao/managerDB/usersManagerDB.js";


export const findByIdServ= (id)=>{

    const userById = userManagerDB .findById(id);
    return userById;

};

const findByEmailServ =(email)=> {



    const userByEmail =  userManagerDB.findByEmail(email)
    
    return userByEmail;

};

export const createOneServ =(obj)=> {

    const createdUser =  userManagerDB.createOne(obj);
    return createdUser;

};

export{findByEmailServ}