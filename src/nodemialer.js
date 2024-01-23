import  nodemailer  from "nodemailer";
import { objConfigEnv } from "./config/config.js";


//evus fdcx bsih xeme

const transporter = nodemailer.createTransport({

    service:"gmail",

    auth:{


        //`${objConfigEnv.nodemailer_user}`,
      // `${objConfigEnv.nodemailer_password}`

        user:"indiradamico22@gmail.com",
        pass: "evusfdcxbsihxeme"

    }


})

/*

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com ',
    port: 465,
    auth: {
      user: '<your@email.address>',
      pass: '<yourP@55word>'
    }
  });

*/

export{transporter}