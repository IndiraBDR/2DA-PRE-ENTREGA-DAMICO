import { Schema, model} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'




const ticketsSchema = new Schema({


    code: {

        type: String,
        required: true,
  
    },

    purchase_datetime: {
        type: Date,

        required: true
    },

     amount: {
        type: Number,
        required: true

    },

   

    purchase: {

        type: String
       
    },
   

});




const ticketsModel = model("Tickets", ticketsSchema);
export { ticketsModel };