import { Schema, model} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import { mongoose } from "mongoose";

const productsSchema = new Schema({


    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true

    },

    code: {

        type: String,
        required: true,
        unique: true,
    },

    stock: {

        type: Number,
        required: true
    },
    category: {

        type: String,
        required: true
    },
    thumbnails: {

        type: String,

    },

    //NUEVO OWNER
    owner:{

        type: String,
         
    }

});

productsSchema.plugin(mongoosePaginate);


const productsModel = model("Products", productsSchema);
export { productsModel };