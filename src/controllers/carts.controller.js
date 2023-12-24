import { findAllCartServ, findCartByIdServ, createOneCartServ, addProductToCartServ, updateCartServ, addProductToCartQuantityServ, deleteTotalProductToCartServ, deleteProductToCartServ,deleteCartByIdServ,purchase } from "../services/carts.service.js";

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

    res.status(200).json({ message: "cart by id", cart });

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

  try {
    const updatedCart = await addProductToCartServ(idCart, idProduct);

    res.status(200).json({ message: "PRODUCTO AGREGADO", product: updatedCart });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: error.message });
  }
}



export const updateCartController = async (req, res) => {

  const { idCart } = req.params;
  const { newProducts } = req.body;

 // console.log(newProducts);

  try {
    const updatedCart = await updateCartServ(idCart, newProducts);

    if (!updatedCart) {
      return res.status(404).json({ message: "cart not found" });
    }

    res.status(200).json({ message: "product update in cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const addProductToCartQuantityController = async (req, res) => {

  const { idCart, idProduct } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCart = await addProductToCartQuantityServ(idCart, idProduct, quantity);

    if (!updatedCart) {
      return res.status(404).json({ message: "cart not found" });
    }

    res.status(200).json({ message: "quantity update in cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const deleteTotalProductToCartController = async (req, res) => {

  const { idCart } = req.params;

  try {
    const updatedCart = await deleteTotalProductToCartServ(idCart);

    if (!updatedCart) {
      return res.status(404).json({ message: "cart not found" });
    }

    res.status(200).json({ message: "product total delete in cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const deleteProductToCartController = async (req, res) => {

  const { idCart, idProduct } = req.params;

  try {
    const updatedCart = await deleteProductToCartServ(idCart, idProduct);

    console.log(updatedCart);

    if (!updatedCart) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "User update IN CADR" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const purchaseCart= async(req,res)=>{

  const { idCart } = req.params;

 
  const response =  await purchase(idCart);

  res.json({response})


}

//ELIMINAR CARRITO

export const deleteToCart =async (req, res) => {

  const { idCart} = req.params;

  try {
    const response = await deleteCartByIdServ(idCart);

    if (!response) {
      return res.status(404).json({ message: "cart not found" });
    }

    res.status(200).json({ message: "cart delete" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}