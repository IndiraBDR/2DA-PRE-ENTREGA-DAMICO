import { findAllServ, findByIdServ, createOneServ, updateOneServ, deleteOneServ } from "../services/products.service.js";

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
      res.status(404).json({ message: "product not found" });
    } else {
      res.status(200).json({ message: "product found", productoFiltrado });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const createOneController = async (req, res) => {

  try {
    const createdProduct = await createOneServ(req.body);
    res.status(200).json({ message: "product creado", product: createdProduct });

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

  try {
    let deletedProduct = await deleteOneServ(pid);

    if (!deletedProduct) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "User delete" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}