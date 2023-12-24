import { cartManagerBD } from "../DAL/dao/mongoDao/carts.dao.mongo.js";

import { ticketsManagerDB  } from "../DAL/dao/mongoDao/tickets.dao.mongo.js";

import {  findUserByCartIdServ } from "../services/users.service.js";



import { userManagerDB } from "../DAL/dao/mongoDao/users.dao.mongo.js";

import {  usersModel } from "../DAL/models/users.model.js";



export const findAllCartServ= () => {

    const carts =  cartManagerBD.findAll()

    return carts

}


export const findCartByIdServ = (idCart) => {

    const cart =  cartManagerBD.findCartById(idCart);

    return  cart


}


export const createOneCartServ = () =>{

    const createCart = cartManagerBD.createOneCart();

    return createCart


}


export const addProductToCartServ = (idCart, idProduct)=>{


    const updatedCart=  cartManagerBD.addProductToCart(idCart, idProduct);

    return updatedCart


}


export const  updateCartServ=(idCart, newProductBody)=>{

    const updatedCart =  cartManagerBD.updateCart(idCart, newProductBody);

    return updatedCart


}

export const addProductToCartQuantityServ = (idCart, idProduct, quantity) =>{

    const updatedCart = cartManagerBD.addProductToCartQuantity(idCart, idProduct, quantity);

    return updatedCart;

}



//ELIMINAR CARRITO
export const  deleteCartByIdServ = (idCart) =>{

    const updatedCart =  cartManagerBD.deleteOne(idCart);
    return updatedCart


}


export const  deleteProductToCartServ = (idCart, idProduct) =>{

    const updatedCart =  cartManagerBD.deleteProductToCart(idCart, idProduct);
    return updatedCart
}


export const  deleteTotalProductToCartServ= (idCart) =>{

    const updatedCart =  cartManagerBD.deleteTotalProductToCart(idCart);
    return updatedCart


}


export const purchase= async(idCart)=>{

    const cart = await cartManagerBD.findCartById(idCart);

    const products = cart.products;

    let availableProducts = [];

    let unavailableProdutcs = [];

    let totalAmount =0;

    for (let item of products) {

        if (item.product.stock >= item.quantity){
            //disponible

            availableProducts.push(item)

            item.product.stock -= item.quantity

           await item.product.save()

            totalAmount += item.quantity * item.product.price;

        }else{

            //no disponible
            
            //653e8a45417a1d5ffca9aa1f
            //653e8a6c417a1d5ffca9aa21
            unavailableProdutcs.push(item)
        }
     
    }

    cart.products = unavailableProdutcs
    await cart.save()

     //EMAIL 

     const userByIdCart = await findUserByCartIdServ(idCart)

      const email=  userByIdCart.email

      console.log(email);


      //EMAIL 


if (availableProducts.length) {

    const ticket={
        code: "ULTIMAPRUEBA",
        purchase_datetime: new Date(),
        amount:totalAmount,
        purchase: email
    }

  const newTik= await ticketsManagerDB.createOne(ticket)

  //console.log(`NEW TICK ${newTik}`);

    return {availableProducts, totalAmount}
    
}


return{unavailableProdutcs}
    

}