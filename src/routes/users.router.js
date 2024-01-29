import { Router } from "express";
import {  findAllUserController, findUserByCartIdController,updateUserController } from "../controllers/users.controller.js";

const routerUsers = Router();

routerUsers.get("/", findAllUserController);
routerUsers.get("/:idCart", findUserByCartIdController );

//NUEVO 3ER PRACT INT
routerUsers.put("/premium/:idUser", updateUserController)


export { routerUsers };