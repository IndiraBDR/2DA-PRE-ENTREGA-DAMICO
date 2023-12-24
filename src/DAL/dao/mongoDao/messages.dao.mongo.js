import { messageModel } from "../../models/messages.model.js";
import { BasicManagerDB} from "../../dao/mongoDao/basic.dao.mongo.js";

class MessageManagerDB extends BasicManagerDB{

    constructor() {

        super(messageModel)
    }

  

}

export { MessageManagerDB };