import dotenv from "dotenv";
dotenv.config();

const objConfigEnv = {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    secret_jwt: process.env.SECRET_KEY_JWT,
};


export {objConfigEnv}