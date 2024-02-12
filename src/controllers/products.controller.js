import { findAllServ, findByIdServ, createOneServ, updateOneServ, deleteOneServ } from "../services/products.service.js";
import { productMock } from "../mock/productMock.js";
import { CustomError } from "../errors/error.generator.js";
import { errorsMessages } from "../errors/errors.enum.js";
import { logger } from "../logger.js"


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
  //console.log("ACA", req.user);
  //INFO DEL USURIO LOGEADO

  try {

    let createdProduct;

    if (req.user) {

      if (req.user.roles === "premium") {

        createdProduct = await createOneServ({ ...req.body, owner: req.user.email });
        logger.info(`OWNER:${createdProduct.owner}`);
        return res.status(200).json({ message: "product creado", product: createdProduct });


      }else{

     
        
        if (!req.body.owner) {

          logger.info(`OWNER POR BODY: ${req.body.owner}`);
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
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const deleteOneController = async (req, res) => {

  const { pid } = req.params;

  let productoFiltrado = await findByIdServ(pid);

  try{

    if (req.user.roles === "premium") {

      //DATOS DE MAIL LOGEADO QUE VIENE EN EL TOKEN = req.user.email

        logger.info(`ROL LOGUEADO: ${req.user.roles}`);
      

        if (!productoFiltrado) {
          return CustomError.generateError(errorsMessages.PRODUCT_NOT_FOUND, 404)
        }
  
        if (productoFiltrado.owner === req.user.email) {
  
          logger.info('EL USURIO SI CREO ESTE PRODUCTO, PUEDE ELIMINARLO');
  
          await deleteOneServ(pid);

          return res.status(200).json({ message: "Product delete" })
  
        } else {
  
          //REVISAR EL CODIGO DE ESTE ERROR SI ESTA CORRCETO--REVISADO LISTO
  
          logger.info('ESTE PRODUCTO NO LO CREO EL USURIO, NO LO PUEDE ELIMINAR');
  
          return res.status(403).json({ message: "NO LO PUEDE ELIMINAR,ESTE PRODUCTO NO LO CREO USTED" })
  
        }
  
  
  
    }


    if (req.user.roles === "admin") {

      if (!productoFiltrado) {
        return CustomError.generateError(errorsMessages.PRODUCT_NOT_FOUND, 404)
      }

        await deleteOneServ(pid);
  
        res.status(200).json({ message: "User delete" });
     
    }
  

  } catch (error) {
    res.status(500).json({ message: error.message });
  }


}




export const productMocksController = async (req, res, next) => {
  try {
    const mockData = productMock();

    res.status(200).json({ message: "Product created successfully", mockData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

