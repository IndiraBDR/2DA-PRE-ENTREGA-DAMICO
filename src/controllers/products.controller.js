import { findAllServ, findByIdServ, createOneServ, updateOneServ, deleteOneServ } from "../services/products.service.js";
import { productMock } from "../mock/productMock.js";
import { CustomError } from "../errors/error.generator.js";
import { errorsMessages } from "../errors/errors.enum.js";

export const findAllController = async (req, res) => {


  try {

    const products = await findAllServ(req.query)

    res.status(200).json({ message: "product total", products });

  } catch (error) {
    res.status(500).json({ message: error.message });



  }


}


export const findByIdController = async (req, res) => {

  const { pid } = req.params;

  try {
    let productoFiltrado = await findByIdServ(pid);

    if (!productoFiltrado) {

      return CustomError.generateError(errorsMessages.PRODUCT_NOT_FOUND, 404)
      //res.status(404).json({ message: "product not found" });
    } else {
      res.status(200).json({ message: "product found", productoFiltrado });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const createOneController = async (req, res) => {

  //console.log("ACAAAA", req.user);
  //LO RECIBE CORRECTAMENTE req.user.email
  try {


    let createdProduct;

    if (req.user) {

    

      if (req.user.roles === "premium") {

        createdProduct = await createOneServ({ ...req.body, owner: req.user.email });
        console.log("OWNEEEER", createdProduct.owner);
        return res.status(200).json({ message: "product creado", product: createdProduct });

      }else{

        if (!req.body.owner) {

          console.log('HOLAAAAAAAAAA', req.body.owner);
  
          createdProduct = await createOneServ({ ...req.body, owner: "admin" });
          return res.status(200).json({ message: "product creado", product: createdProduct });
  
        } 


      }




    }
    
   


  } catch (error) {
    res.status(500).json({ message: error.message });
  }




}















export const updateOneController = async (req, res) => {

  const { pid } = req.params;

  try {
    const updatedProduct = await updateOneServ(pid, req.body);

    if (!updatedProduct) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "User update" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const deleteOneController = async (req, res) => {

  const { pid } = req.params;

  let deletedProduct;

  ///NUEVOOO


    if (req.user.roles === "premium") {

      try {
  
        console.log(req.user.roles);
  
        //DATOS DE LOGEO QUE VIENE EN EL TOKEN = req.user.email
  
        let productoFiltrado = await findByIdServ(pid);
  
        if (productoFiltrado.owner === req.user.email) {
  
          console.log('SI LO CREO USTED, ELIMINADO');
  
          await deleteOneServ(pid);
  
          return res.status(200).json({ message: "User delete" })
  
        } else {
  
          //REVISAR EL CODIGO DE ESTE ERROR SI ESTA CORRCETO
  
          console.log('ESTE PRODUCTO NO LO CREO USTED, NO LO PUEDE ELIMINAR');
  
          return res.status(400).json({ message: "NO LO PUEDE ELIMINAR,ESTE PRODUCTO NO LO CREO USTED, NO LO PUEDE ELIMINAR" })
  
        }
  
  
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  
    }




    if (req.user.roles === "admin") {

      try {
        deletedProduct = await deleteOneServ(pid);
  
        if (!deletedProduct) {
          // return res.status(404).json({ message: "product not found" });
          return CustomError.generateError(errorsMessages.PRODUCT_NOT_FOUND, 404)
        }
  
        res.status(200).json({ message: "User delete" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  
  

 

  //NUEVOOOO


  //VIEJO
 

  /*
    /////
   
  
    */
}




export const productMocksController = async (req, res, next) => {
  try {
    const mockData = productMock();

    res.status(200).json({ message: "Product created successfully", mockData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

