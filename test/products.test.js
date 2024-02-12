import { productManagerDB } from "../src/DAL/dao/mongoDao/products.dao.mongo.js";
import { expect } from "chai";
import "../src/db/configDB.js"




//"test": "mocha -t 10000 test/products.test.js"

//import "./db-test.js"

const productMock = {

    "title": "titulo1007",

    description: 'descripcion888107',

    price: 40,

    code: 'abc12888107',

    stock: 4,

    category: 'BBB',

    thumbnails: 'xxxx888107'

};

let productId;

describe('Get-All products', function () {


    it("should return an object", async function () {

        const objParams = { limit: 10, sort: -1, page: 1 }

        const results = await productManagerDB.findAll(objParams)

        // console.log('ACAAAAAIIII',results.payload.length);

        expect(results).to.be.an('object')
        expect(results).to.have.property('payload')
        expect(results.payload).to.be.an('array')
        expect(results.payload).to.have.lengthOf(objParams.limit);


    }
    )

}

)

describe('Post-Created Produc', function () {

    it("should return an object", async function () {

        const results = await productManagerDB.createOne(productMock)

        productId = results._id

        expect(results).to.be.an('object')
        expect(results).to.have.property('_id');

    }

    )


}

)



describe('Get-Produc By Id', function () {

    it("should return an object", async function () {

        const results = await productManagerDB.findById(productId)

        expect(results).to.be.an('object')
        expect(results).to.have.property('_id');

    })

})



describe('PUT-Udatep Product', function () {

    const udatedMock = {

        category: 'AAA',

    }

    it("Should updated a product by id", async function () {

        const results = await productManagerDB.updateOne({ _id: productId }, udatedMock)
        console.log(results);

        expect(results).to.be.an('object')

    })


})




describe('Delete Product', function () {

    it("Should delete a product by id", async function () {


        const results = await productManagerDB.deleteOne(productId)
        console.log(results);

        expect(results).to.be.an('object')


    })


})


