import { Router } from "express";
import {  findAllUserController, findUserByCartIdController,updateUserController,saveUserDocumentsController } from "../controllers/users.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const routerUsers = Router();

routerUsers.get("/", findAllUserController);
routerUsers.get("/:idCart", findUserByCartIdController );

//NUEVO 3ER PRACT INT
routerUsers.put("/premium/:idUser", updateUserController)

routerUsers.post("/:id/documents",upload.fields([

   {name:"dni", maxCount:1},
   {name:"address", maxCount:1},
   {name:"bank", maxCount:1}

]), saveUserDocumentsController)


export { routerUsers };