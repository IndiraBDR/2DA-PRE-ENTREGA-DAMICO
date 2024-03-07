import { findAllCartServ, findCartByIdServ, createOneCartServ, addProductToCartServ, updateCartServ, addProductToCartQuantityServ, deleteTotalProductToCartServ, deleteProductToCartServ, deleteCartByIdServ, purchase } from "../services/carts.service.js";
import { findByIdServ } from "../services/products.service.js";
import { CustomError } from "../errors/error.generator.js";
import { errorsMessages } from "../errors/errors.enum.js";



export const findAllCartController = async (req, res) => {

  try {
    const carts = await findAllCartServ()

    res.status(200).json({ message: "carts total", carts });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}


export const findCartByIdController = async (req, res) => {

  const { idCart } = req.params;


  try {
    const cart = await findCartByIdServ(idCart)

    if (!cart) {

      CustomError.generateError(errorsMessages.CART_NOT_FOUND, 404)

    } else {
      res.status(200).json({ message: "cart found", cart });
    }
    //res.status(200).json({ message: "cart by id", cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const createOneCartController = async (req, res) => {

  try {
    const createCart = await createOneCartServ()

    res.status(200).json({ message: "carrito creado", cart: createCart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



export const addProductToCartController = async (req, res) => {

  const { idCart, idProduct } = req.params;

  const cart = await findCartByIdServ(idCart)

  if (!cart) {

    return CustomError.generateError(errorsMessages.CART_NOT_FOUND, 404)

  }

  try {

   // if (req.user) {
      
      //NUEVOO 3ER PRACT INT DEBE IR EN SERVICE

      if (req.user.roles === "premium") {

        let productoFiltrado = await findByIdServ(idProduct);

        if (productoFiltrado.owner === req.user.email) {

          return res.status(403).json({ message: "USTED ES EL DUEÑO, NO  PUEDE AGREGAR EL PRODUCTO AL CARRITO" })

        }

      }
      ///////


     
      const updatedCart = await addProductToCartServ(idCart, idProduct);

      res.status(200).json({ message: "product added successfully", product: updatedCart });



   // } else {



    // return CustomError.generateError(errorsMessages.USER_NOT_LOGGED_IN, 401)
      //res.status(401).json({ message: "There is no logged in user" });
      //REVISAR CODGI DEL ERROR- REVISADO LISTO

   // }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }



}



export const updateCartController = async (req, res) => {

  const { idCart } = req.params;
  const { newProducts } = req.body;

  try {

    const cart = await findCartByIdServ(idCart)

    if (!cart) {

      return CustomError.generateError(errorsMessages.CART_NOT_FOUND, 404)

    }

    const updatedCart = await updateCartServ(idCart, newProducts);



    res.status(200).json({ message: "product update in cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const addProductToCartQuantityController = async (req, res) => {

  const { idCart, idProduct } = req.params;
  const { quantity } = req.body;

  try {

    const cart = await findCartByIdServ(idCart)

    const producto = await findByIdServ(idProduct);

    if (!cart) {

      return CustomError.generateError(errorsMessages.CART_NOT_FOUND, 404)

    }


    if (!producto) {

      return CustomError.generateError(errorsMessages.PRODUCT_NOT_FOUND, 404)

    }

    const updatedCart = await addProductToCartQuantityServ(idCart, idProduct, quantity);


    res.status(200).json({ message: "quantity update in cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const deleteTotalProductToCartController = async (req, res) => {

  const { idCart } = req.params;

  try {


    const updatedCart = await deleteTotalProductToCartServ(idCart);

    res.status(200).json({ message: "product total delete in cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const deleteProductToCartController = async (req, res) => {

  const { idCart, idProduct } = req.params;

  try {


    const cart = await findCartByIdServ(idCart)

    if (!cart) {

      return CustomError.generateError(errorsMessages.CART_NOT_FOUND, 404)

    }


    const updatedCart = await deleteProductToCartServ(idCart, idProduct);


    res.status(200).json({ message: "Product deleted in cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const purchaseCartController = async (req, res) => {

  const { idCart } = req.params;

  const cart = await findCartByIdServ(idCart)

  if (!cart) {

    return CustomError.generateError(errorsMessages.CART_NOT_FOUND, 404)

  }


  const response = await purchase(idCart);

  res.json({ response })


}

//ELIMINAR CARRITO COMPLETO

export const deleteToCart = async (req, res) => {

  const { idCart } = req.params;

  try {

    const cart = await findCartByIdServ(idCart)

    if (!cart) {

      return CustomError.generateError(errorsMessages.CART_NOT_FOUND, 404)

    }

    res.status(200).json({ message: "cart delete" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}