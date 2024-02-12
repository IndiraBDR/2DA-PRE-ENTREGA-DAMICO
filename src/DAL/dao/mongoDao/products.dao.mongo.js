import { productsModel } from "../../models/products.model.js";
import { BasicManagerDB} from "../../dao/mongoDao/basic.dao.mongo.js";

class ProductManagerDB  extends BasicManagerDB{

    constructor() {

        super(productsModel)
    }

    //http://localhost:8080/api/products?page=1&limit=10&sort=-1&category=AAA

    
    async findAll(obj) {

        let { limit = 10, page = 1, sort = 0, ...query } = obj;

       // console.log("ACA",sort);
       //  sort = 0 --> valor por defecto, indica ningun tipo de orden
       //-nombredelapropiedad,  lo ordena descendentemente con base en esa propiedad, 
       // nombredelapropiedad sin el signo menos,  lo ordena ascendentemente con base en esa propiedad

        if (+sort === 1) {

        
            sort = 'price'

        } else if (+sort === -1) {

            sort = '-price'
        }

        const options = {
            page: page,
            limit: limit,
            sort
          
        }

       
        const response = await productsModel.paginate(query, options);

        const results = {
            status: response.docs ? "success" : "error",
            payload: response.docs,
            count: response.totalDocs,
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevLink: response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null,
            nextLink: response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null,

        }

        return results

    };




}


export const productManagerDB = new ProductManagerDB();
export { ProductManagerDB };