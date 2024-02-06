import supertest from "supertest";
import { expect } from "chai";
import { productManagerDB } from "../src/DAL/dao/mongoDao/products.dao.mongo.js";
import "../src/db/configDB.js"

//import "./db-test.js"

//"test": "mocha -t 10000 test/products-superTest.test.js"

//    "test": "mocha -t 10000 test/*.test.js" //para CORRER AMBOS TEST


const requester = supertest("http://localhost:8080")


/* BEFOREE

 before(async()=>{

     let user = {
 
         email: 'premium2@gmail.com',
         password: '1234'
         
         }
 
     const response= await requester.post('api/user/login').send(user);
     const cookie = response.headers["set-cookie"][0];
     const cookieData={
         name:cookie.split("=")[0],
         value: cookie.split("=")[1].split(";")[0]
     }
 
 
 })


 .set('Cookie',[`${cookieData.name}=${cookieData.value}`])
*/



/* TEST PRODUCTS ALL
describe('GET/api/products', function () {

    it("should return an object", async function () {

        const objParams = { limit: 10, sort: -1, page: 1 }

        const response = await requester.get("/api/products").query(objParams)

        const productsAllTest = response._body.products

        //const limitTest=response.req._header

        expect(productsAllTest).to.be.an('object')
        expect(productsAllTest).to.have.property('payload')
        expect(productsAllTest.payload).to.be.an('array')
        expect(productsAllTest.payload).to.have.lengthOf(objParams.limit);
        expect(response.statusCode).to.be.equals(200);
    }
    )


}


)

*/


/*TEST PRODUCTS BY ID
describe('GET/api/products/:pid', function() {

    it("should return an object", async function() {
        
        const products  = await requester.get("/api/products")

         const productsList= products._body.products.payload

         const product =productsList[0]

         const response  = await requester.get(`/api/products/${product._id}`)

         console.log(response._body.productoFiltrado);

         expect(response._body.productoFiltrado).to.be.an('object')
         expect(response.statusCode).to.be.equals(200);
    }

    )


}

)
*/


describe('POST/api/session/login', function () {

    it("should loged", async function () {


        const response = await requester.post('api/sessions/login').send({

            email: "indiradamico22@gmail.com",
            password: "1234"

        });

        console.log('REEEEES', response);

        //const cookie = response.headers["set-cookie"][0];

        // const cookieData={
        //     name:cookie.split("=")[0],
        //    value: cookie.split("=")[1].split(";")[0]
        // }

         expect(response.statusCode).to.be.equals(200);

    })

    /* CREATED PRODUCT
       it("should created product??", async function () {
   
           const objBody={
   
                title: 'titulo82',
               
               description: 'descripcion82',
               
               price: 40,
               
               code:'abc1282',
               
               stock: 4,
               
               category: 'BBB',
               
               thumbnails: 'xxxx82'
               
           }
           const response = await requester.post("/api/products").set('Cookie',[`${cookieData.name}=${cookieData.value}`]).send(objBody)
   
           
           const newProductTest = response._body.product
   
         //  console.log("NUEVOO PRODUCTO",newProductTest);
   
   
           expect(newProductTest).to.be.an('object')
           expect(response.statusCode).to.be.equals(200);
       }
       )
   */

})












/*TEST PRODUCT UPDATE

describe('PUT/api/products/:pid', function() {

    it("should return an object", async function() {
        
        const products  = await requester.get("/api/products")

         const productsList= products._body.products.payload

         const product =productsList[0]

         const response  = await requester.get(`/api/products/${product._id}`)

        // console.log(response._body.productoFiltrado);

         expect(response._body.productoFiltrado).to.be.an('object')
         expect(response.statusCode).to.be.equals(200);
    }

    )


}

)

*/