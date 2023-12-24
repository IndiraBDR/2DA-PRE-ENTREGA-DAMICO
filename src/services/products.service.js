import { productManagerDB } from "../DAL/dao/mongoDao/products.dao.mongo.js";

export const  findAllServ = (obj) =>  {

    const products =  productManagerDB.findAll(obj)
    return products

};


export const findByIdServ = (id) => {

    const productoFiltrado =  productManagerDB.findById(id);

    return productoFiltrado

};

export const createOneServ =(obj)  => {

    const createdProduct =  productManagerDB.createOne(obj);

    return  createdProduct 

};

export const  updateOneServ =(id, obj)=>  {

    const updatedProduct =  productManagerDB.updateOne(id, obj);
    return updatedProduct

};

export const  deleteOneServ = (id) => {

   const deletedProduct = productManagerDB.deleteOne(id);

    return deletedProduct

};