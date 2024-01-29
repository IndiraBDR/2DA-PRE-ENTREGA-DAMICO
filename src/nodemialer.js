import  nodemailer  from "nodemailer";
import { objConfigEnv } from "./config/config.js";


//evus fdcx bsih xeme

const transporter = nodemailer.createTransport({

    service:"gmail",

    auth:{

        user:objConfigEnv.nodemailer_user,
        pass:objConfigEnv.nodemailer_password

    }


})



export{transporter}