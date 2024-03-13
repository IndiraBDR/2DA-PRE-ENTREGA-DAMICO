import { Router } from "express";
import { findAllUserController, findUserByCartIdController, updateUserController, saveUserDocumentsController, deleteInactiveUsersController, updateUserAdminController, deleteUserAdminController } from "../controllers/users.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { tokenValidationMiddleware } from "../middleware/jwt.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const routerUsers = Router();

routerUsers.get("/", tokenValidationMiddleware, findAllUserController);
routerUsers.get("/:idCart", findUserByCartIdController);
routerUsers.put("/premium/:idUser", updateUserController)
routerUsers.post("/admin/updateUser/:userId", tokenValidationMiddleware, authMiddleware(["admin"]), updateUserAdminController)
routerUsers.post("/admin/deleteUser/:userId", tokenValidationMiddleware, authMiddleware(["admin"]), deleteUserAdminController)
routerUsers.delete("/deleteInactiveUsers", deleteInactiveUsersController)
routerUsers.post("/:id/documents", upload.fields([

   { name: "dni", maxCount: 1 },
   { name: "address", maxCount: 1 },
   { name: "bank", maxCount: 1 }

]), saveUserDocumentsController)


export { routerUsers };