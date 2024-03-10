import { Router } from "express";
import {  findAllUserController, findUserByCartIdController,updateUserController,saveUserDocumentsController, deleteInactiveUsers, updateUserAdminController, deleteUserAdminController } from "../controllers/users.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { tokenValidationMiddleware } from "../middleware/jwt.middleware.js";

const routerUsers = Router();

routerUsers.get("/",tokenValidationMiddleware, findAllUserController);
routerUsers.get("/:idCart", findUserByCartIdController );

//NUEVO 3ER PRACT INT
routerUsers.put("/premium/:idUser", updateUserController)


///NUEVO FINAL
routerUsers.post("/admin/updateUser/:userId", updateUserAdminController)


routerUsers.post("/admin/deleteUser/:userId", deleteUserAdminController)


//routerUsers.delete("/rolUsersSetting",)

routerUsers.delete("/deleteInactiveUsers",deleteInactiveUsers)

routerUsers.post("/:id/documents",upload.fields([

   {name:"dni", maxCount:1},
   {name:"address", maxCount:1},
   {name:"bank", maxCount:1}

]), saveUserDocumentsController)


export { routerUsers };