import { usersModel } from "../../models/users.model.js";
import { BasicManagerDB } from "../../dao/mongoDao/basic.dao.mongo.js";

class UsersManagerDB extends BasicManagerDB {

    constructor() {

        super(usersModel)
    }


    async findByEmail(email) {

        const response = await usersModel.findOne({ email })

        return response;

    };


    async findUserByCartId(cart) {

        const response = await usersModel.findOne({ cart })

        return response

        //Me va a mostrar el usario de la coleccion   que coincida en su propiedad "cart que es un objtipo ID" (asi se debe llamar ya que asi se llamaen el modelo) con el parametro que yo lo estoy pasando que seria el id del carrito que esta realizando la compra que esta conectado siempre alid del user de cuando se creo RESUMEN : EL id del usurio que tiene carrito


    }
}


export const userManagerDB = new UsersManagerDB();
export { UsersManagerDB };



