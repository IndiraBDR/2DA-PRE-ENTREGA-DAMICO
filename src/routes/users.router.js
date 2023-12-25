import { Router } from "express";
import {  findAllUserController, findUserByCartIdController } from "../controllers/users.controller.js";

const routerUsers = Router();

routerUsers.get("/", findAllUserController);
routerUsers.get("/:idCart", findUserByCartIdController );


export { routerUsers };