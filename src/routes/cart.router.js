import { Router } from "express";
import { findAllCartController, findCartByIdController, createOneCartController, addProductToCartController, updateCartController, addProductToCartQuantityController, deleteTotalProductToCartController, deleteProductToCartController, deleteToCart, purchaseCartController } from "../controllers/carts.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { tokenValidationMiddleware } from "../middleware/jwt.middleware.js";

const routerCart = Router();


routerCart.get("/", findAllCartController);
routerCart.get("/:idCart", findCartByIdController);
routerCart.post("/", createOneCartController);
routerCart.post("/:idCart/products/:idProduct", tokenValidationMiddleware, addProductToCartController);

routerCart.put("/:idCart/products/:idProduct", addProductToCartQuantityController);
routerCart.delete("/:idCart", deleteTotalProductToCartController);
routerCart.delete("/:idCart/products/:idProduct", deleteProductToCartController);
routerCart.get("/:idCart/purchase", purchaseCartController);
routerCart.delete("/:idCart/elimicar-carrito", deleteToCart)

export { routerCart };




