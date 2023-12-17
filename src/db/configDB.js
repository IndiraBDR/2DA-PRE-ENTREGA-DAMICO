import mongoose from "mongoose";

import { objConfigEnv  } from "../config/config.js";

/*

const URI='mongodb+srv://indiradamico22:elamoresdedos@cluster0.n1eqmw8.mongodb.net/dbIndiraDamico?retryWrites=true&w=majority';

mongoose.connect(URI)
.then(()=>console.log("conectado a la BDIndira"))
.catch((error)=> console.log(error));

*/

//ACA CAMBIAR VARIABLE ENV
const URI = objConfigEnv.mongo_uri;

mongoose.connect(URI)
    .then(() => console.log("conectado a ecommerce"))
    .catch((error) => console.log(error));