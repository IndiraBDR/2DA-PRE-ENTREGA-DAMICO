import express from "express";
import { routerProduct } from "./routes/products.router.js";
import { routerCart } from "./routes/cart.router.js";

const app = express();

app.use(express.json());

app.use("/api/products", routerProduct);

app.use("/api/carts", routerCart);

app.listen(8080, () => {
  "LEYENDO PUERTO 8080";
});
