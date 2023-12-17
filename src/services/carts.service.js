import { cartManagerBD } from "../dao/managerDB/cartsManagerDB.js";


export const findAllCartServ= () => {

    const carts =  cartManagerBD.findAllCart()

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



/*
export const  deleteCartByIdServ = (idCart) =>{

    const updatedCart =  cartManagerBD.deleteCartById(idCart);

    return updatedCart


}
*/

export const  deleteProductToCartServ = (idCart, idProduct) =>{

    const updatedCart =  cartManagerBD.deleteProductToCart(idCart, idProduct);

    return updatedCart
}


export const  deleteTotalProductToCartServ= (idCart) =>{

    const updatedCart =  cartManagerBD.deleteTotalProductToCart(idCart);
    return updatedCart


}