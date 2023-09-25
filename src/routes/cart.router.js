import { Router } from "express";
import { CartManager} from "../cartManager.js"


const routerCart = Router();

const cartManager = new CartManager(); 

routerCart.get("/", async (req, res) => {
    //let limit =  Number(req.query.limit)  ;
    const { limit } = req.query;
  
    try {
      let cart = await cartManager.getCart();
  
      if (limit) {
        let productsLimitados = cart.slice(0, +limit);
  
        res.status(200).json({ message: "product found", productsLimitados });
      } else {
        res.status(200).json({ message: "product total", cart });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


routerCart.post("/", async (req, res) => {

    try {

      let response = await cartManager.addCart();
      res.json({ response });


    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



  routerCart.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      let response = await cartManager.deleteCartById(+id)
  
      if (!response) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      res.status(200).json({ message: "Cart delete" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


  routerCart.post("/:cid/product/:pid", async (req, res) => {

    const {cid} = req.params;
    const {pid} = req.params;


  
    try {

      let response = await cartManager.addProductInCart(+cid,+pid);
      res.json({ response });


    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  

  

 routerCart.get("/:cid", async (req, res) => {
    const { cid } = req.params;
  
    try {
      let cartFiltrado = await cartManager.getCartById(+cid);
  
      if (!cartFiltrado) {
        res.status(404).json({ message: "cart not found" });
      } else {
        res.status(200).json({ message: "cart found", cartFiltrado });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });




  
  /*
  routerCart.get("/:id", async (req, res) => {
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
*/
export {routerCart};



