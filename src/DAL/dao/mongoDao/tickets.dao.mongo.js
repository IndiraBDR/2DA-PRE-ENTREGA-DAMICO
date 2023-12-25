import { ticketsModel } from "../../models/tickets.model.js";
import { BasicManagerDB} from "../../dao/mongoDao/basic.dao.mongo.js";

class TicketsManagerDB extends BasicManagerDB{

    constructor() {

        super(ticketsModel)
    }



}


export const ticketsManagerDB = new TicketsManagerDB();

export { TicketsManagerDB  };