import { dirname } from "path";
import { fileURLToPath } from "url";
import  bcrypt from "bcrypt";

const __dirname= dirname(fileURLToPath(import.meta.url))

const hashData= async (data)=>{

    return bcrypt.hash(data,10);

}

const compareData= async (data,hashedData)=>{

    return bcrypt.compare(data,hashedData);

}


export{__dirname,hashData,compareData}