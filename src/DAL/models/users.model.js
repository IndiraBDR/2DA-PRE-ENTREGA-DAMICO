import { Schema, model} from "mongoose";
import { mongoose } from "mongoose";

const usersSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    last_name: { 
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true

    },

    password: {

        type: String,
        required: true,
        
    },

    age:{
        type: Number
    },



    roles:{
        type:String,
        enum:["user" , "admin", "premium"],
        default: "user"
    },
   
    cart:{

        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Carts'
        
    },

  

    isGithub: {

        type: Boolean,
        default:false,
        
    },


    documents: {

        type: [
            {
                name:String,
                reference:String
            }

        ],
        default:[],
        
    },

    status:{
        type:String,
        enum:["loaded-id" , "loaded-bank", "loaded-address","completed-documents","documents-are-missing",'loaded-id-address'],
        default: "documents-are-missing"
    },

    last_connection: {
        type: Date,
       // required: true
    },


    
});

const usersModel = model("Users", usersSchema);
export { usersModel };