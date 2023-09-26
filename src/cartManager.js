import fs from "fs";
import { ProductManager } from "./productManager.js";
import { log } from "console";

const productManager = new ProductManager(); //instancia de la class

class CartManager {
  constructor() {
    this.path = "cart.json";
  }

  async getCart() {
    try {
      if (fs.existsSync(this.path)) {
        const cartFile = await fs.promises.readFile(this.path, "utf-8");

        return JSON.parse(cartFile);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addCart() {
    const carts = await this.getCart();

    let id;

    if (!carts.length) {
      id = 1;
    } else {
      id = carts[carts.length - 1].id + 1;
    }

    const newCarts = [...carts, { id: id, products: [] }];

    await fs.promises.writeFile(this.path, JSON.stringify(newCarts));

    return "carrito agregado";

    /*
    try {
      const cart = await this.getCart();

      let id;

      if (!cart.length) {
        id = 1;
      } else {
        id = cart[cart.length - 1].id + 1;
      }

      const products = { ...product,id} ;

      

     // const newProductsId= {id, ...newProducts};

      cart.push(products );

      await fs.promises.writeFile(this.path, JSON.stringify(cart));
      return products ;


    } catch (error) {
      return error;
    }

    */
  }

  async getCartById(id) {
    try {
      const cart = await this.getCart();

      const cartFiltrado = cart.find((item) => item.id === id);

      return cartFiltrado;
    } catch (error) {
      return error;
    }
  }

  async deleteCartById(id) {
    try {
      const cart = await this.getCart();

      const cartFiltrado = cart.find((item) => item.id === id);

      if (cartFiltrado) {
        const cart2 = cart.filter((item) => item.id != id);
        await fs.promises.writeFile(this.path, JSON.stringify(cart2));
        return cart2;
      } else {
        return cartFiltrado;
      }
    } catch (error) {
      return error;
    }
  }

  async addProductInCart(cId, pId) {
   
    const cartById = await this.getCartById(cId);

    const productIndex = cartById.products.findIndex(item => item.productId === pId);

    if(productIndex !== -1){


      let a = cartById.products[productIndex].quantity++;
      await fs.promises.writeFile(this.path, JSON.stringify(a));
    }else{

      let b = cartById.products.push({productId:pId, quantity:1});
      await fs.promises.writeFile(this.path, JSON.stringify(b));
    }

  
  /*
    const productById = await productManager.getProductById(pId);

    const cartFilter = await this.deleteCartById(cId);

    const cart = await this.getCart();
    
    if (cartById.products.some((prod) => prod.id === productId)) {
      let sumarProductInCart = cartById.products.find(
        (prod) => prod.id === productId
      );

      console.log(sumarProductInCart);

      sumarProductInCart.quantity + 1;

      const newCartsA = [{ products: sumarProductInCart }, ...cartFilter];

      console.log(newCartsA);

      await fs.promises.writeFile(this.path, JSON.stringify(newCartsA));

      return "Producto sumado";
    }

    cartById.products.push({ id: productById.id, quantity: 1 });

    const newCarts = [cartById, ...cartFilter];

    await fs.promises.writeFile(this.path, JSON.stringify(newCarts));

    return "Producto agregado";

    */
  }
  

  /*
  async getProductById(id) {
    try {
      const products = await this.getProduct();

      const productoFiltrado = products.find((item) => item.id === id);

        return productoFiltrado;
     
    } catch (error) {
      return error;
    }
  }

  async deleteProductById(id) {
    try {
      const products = await this.getProduct();

      const productoFiltrado = products.find((item) => item.id === id);

      
      if (productoFiltrado) {

        const products2 = products.filter((item) => item.id != id);
        await fs.promises.writeFile(this.path, JSON.stringify(products2));
      }

     return productoFiltrado; 

    
       
      
    } catch (error) {
      return error;
    }
  }




 async updateProduct(id,obj) {

     try {

      const products = await this.getProduct();

      const index = products.findIndex((item) => item.id === id);

      
      if (index === -1) {

        return null
        
      }
     

      const updateProd = { ...products[index], ...obj }

      products.splice(index,1,updateProd);

   
    await fs.promises.writeFile(this.path, JSON.stringify(products));

   

    return updateProd

    
    
    
    } catch (error) {
      return error;
    }
  }

*/
}

export { CartManager };
