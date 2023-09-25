import express from "express";
import { ProductManager } from "./productManager.js";
import { routerProduct } from "./routes/products.router.js";
import { routerCart } from "./routes/cart.router.js";

const app = express();

app.use(express.json());

app.use("/api/products",routerProduct)

app.use("/api/cart",routerCart)

/*
const productManager = new ProductManager(); //instancia de la class

app.get("/api/products", async (req, res) => {
  //let limit =  Number(req.query.limit)  ;
  const { limit } = req.query;

  try {
    let products = await productManager.getProduct();

    if (limit) {
      let productsLimitados = products.slice(0, +limit);

      res.status(200).json({ message: "product found", productsLimitados });
    } else {
      res.status(200).json({ message: "product total", products });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let productoFiltrado = await productManager.getProductById(+id);

    if (!productoFiltrado) {
      res.status(404).json({ message: "product not found" });
    } else {
      res.status(200).json({ message: "product found", productoFiltrado });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  const { title, descrptiption, price, code, stock } = req.body;

  if (!title || !descrptiption || !price || !code || !stock) {
    return res.status(400).json({ message: "Some data is missing" });
  }

  try {
    let response = await productManager.addProduct(req.body);
    res.json({ message: "usuario creado", response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let response = await productManager.deleteProductById(+id);

    if (!response) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "User delete" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await productManager.updateProduct(+id, req.body);

    if (!response) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "User update" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
*/


app.listen(8080, () => {});
