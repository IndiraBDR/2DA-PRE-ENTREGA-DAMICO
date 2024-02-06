import mongoose from "mongoose";




const URI='mongodb+srv://indiradamico22:elamoresdedos@cluster0.n1eqmw8.mongodb.net/dbSuperTest?retryWrites=true&w=majority';

mongoose.connect(URI)
.then(()=>console.log("conectado a la dbSuperTes"))
.catch((error)=> console.log(error));

