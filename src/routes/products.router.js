import { Router } from "express";
import { findAllProductsController, findByIdProductController, createOneProductController, updateOneProductController, deleteOneProductController, productMocksController } from "../controllers/products.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import passport from "passport";
import { tokenValidationMiddleware } from "../middleware/jwt.middleware.js";
const routerProduct = Router();


routerProduct.get("/", findAllProductsController);
routerProduct.get("/:pid", findByIdProductController);
routerProduct.post("/", tokenValidationMiddleware, authMiddleware(["admin", "premium"]), createOneProductController);
routerProduct.put("/:pid", tokenValidationMiddleware, authMiddleware(["admin", "premium"]), updateOneProductController);
routerProduct.delete("/:pid", tokenValidationMiddleware, authMiddleware(["admin", "premium"]), deleteOneProductController);
routerProduct.get('/mock/mockingproducts', productMocksController);



export { routerProduct };
