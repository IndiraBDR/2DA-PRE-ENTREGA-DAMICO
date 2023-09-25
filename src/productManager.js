
import fs from 'fs'


class ProductManager {
  constructor() {
    this.path = "products.json";
  }

  async getProduct() {
    try {
      if (fs.existsSync(this.path)) {
        const productsFile = await fs.promises.readFile(this.path, "utf-8");

        return JSON.parse(productsFile);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getProduct();

      let id;

      if (!products.length) {
        id = 1;
      } else {
        id = products[products.length - 1].id + 1;
      }

      const newProduct = { ...product,id} ;

     // const newProductsId= {id, ...newProducts};

      products.push(newProduct);

      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return newProduct;


    } catch (error) {
      return error;
    }
  }

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

      console.log(productoFiltrado);
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





 };



export { ProductManager }

/*
async function test() {


  const productos = new ProductManager();

  console.log("Arreglo vacio");
  console.log(await productos.getProduct());

  console.log("Agregando producto");
  await productos.addProduct(
    "titulo6",
    "descripcion6",
    25,
    "xxxx6",
    "abc123",
    3
  );
 
  const arrayProductos = await productos.getProduct();
  console.log(arrayProductos);
 
  console.log("--BUSQUEDA POR ID--");
  const BusquedaID = await productos.getProductById(3);

  console.log("--MODIFICACION  MANTENIENDO ID=");
/*
  await productos.updateProduct({
    title: "titulo3",
    descrptiption: "descripcion2",
    price: 100000,
    thumbnail: "yyyy2",
    code: "abc123",
    stock: 3,
    id: 2,
  });

*/

//console.log("--BORRANDO PRODUCTO--");
 //await productos.deleteProductById(3)
 

 //await productos.updateProduct(3, "title:INDIRA")

 
//}



//test();
