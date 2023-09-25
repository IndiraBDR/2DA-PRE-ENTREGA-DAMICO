import { Router } from "express";
import { ProductManager } from "../productManager.js"


const routerProduct = Router();


const productManager = new ProductManager(); //instancia de la class

routerProduct.get("/", async (req, res) => {
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

routerProduct.get("/:id", async (req, res) => {
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

routerProduct.post("/", async (req, res) => {
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

routerProduct.delete("/:id", async (req, res) => {
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

routerProduct.put("/:id", async (req, res) => {
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

export{routerProduct};