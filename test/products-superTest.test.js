import supertest from "supertest";
import { expect } from "chai";
import "../src/db/configDB.js"

//import "./db-test.js"
//"test": "mocha -t 10000 test/products-superTest.test.js"
//    "test": "mocha -t 10000 test/*.test.js" //para CORRER AMBOS TEST

const requester = supertest("http://localhost:8080")

let cookieData;
let productId;

before(async function () {


    let user = {


        email: "premium2@gmail.com",
        password: "1234"


    }

    const response = await requester.post('/api/sessions/login').send(user);
    const cookie = response.headers["set-cookie"][0];
    cookieData = {
        name: cookie.split("=")[0],
        value: cookie.split("=")[1].split(";")[0]
    }

});

//TEST PRODUCTS ALL

describe('GET/api/products', function () {

    it("should return an object with an array 'payload' that contains the products", async function () {

        const objParams = { limit: 10, sort: -1, page: 1 }

        const response = await requester.get("/api/products").set('Cookie', [`${cookieData.name}=${cookieData.value}`]).query(objParams)

        const productsAllTest = response._body.products

        expect(productsAllTest).to.be.an('object')
        expect(productsAllTest).to.have.property('payload')
        expect(productsAllTest.payload).to.be.an('array')
        expect(productsAllTest.payload).to.have.lengthOf(objParams.limit);
        expect(response.statusCode).to.be.equals(200);
    }
    )


}

)


// CREATED PRODUCT 

describe('POST/api/products', function () {


    it("should created product", async function () {

        const objBody = {

            "title": "titulo97",

            description: 'descripcion88897',

            price: 40,

            code: 'abc1288897',

            stock: 4,

            category: 'BBB',

            thumbnails: 'xxxx88897'

        }



        const response = await requester.post("/api/products").set('Cookie', [`${cookieData.name}=${cookieData.value}`]).send(objBody)

        const newProductTest = response._body.product
        productId = newProductTest._id

        expect(newProductTest).to.be.an('object')
        expect(response.statusCode).to.be.equals(200)
    }
    )



})



//GET PRODUCT BY ID

describe('GET/api/products/:pid', function () {

    it("should return an object", async function () {


        const response = await requester.get(`/api/products/${productId}`).set('Cookie', [`${cookieData.name}=${cookieData.value}`])


        expect(response._body.productoFiltrado).to.have.property('_id');
        expect(response._body.productoFiltrado).to.be.an('object')
        expect(response.statusCode).to.be.equals(200);
    }

    )


}

)



// UPDATED PRODUCT

describe('PUT/api/products/:pid', function () {

    it("Should updated a product by id(message:Product updated/status:200", async function () {


        const objBodyUpdated = {

            category: 'AAA',

        }


        const responseUpdated = await requester.put(`/api/products/${productId}`).set('Cookie', [`${cookieData.name}=${cookieData.value}`]).send(objBodyUpdated)


        expect(responseUpdated.statusCode).to.be.equals(200);
        expect(responseUpdated._body.message).to.equals("Product updated");



    }
    )


}

)


// DELETE PRODUCT

describe('DELETE/api/products/:pid', function () {


    it("Should delete a product by id(message:Product delete/status:200)", async function () {


        const responseDelete = await requester.delete(`/api/products/${productId}`).set('Cookie', [`${cookieData.name}=${cookieData.value}`])

        //console.log(responseDelete._body);

        expect(responseDelete._body.message).to.equals("Product delete");
        expect(responseDelete.statusCode).to.be.equals(200);
    }

    )

}

)
