import { productManagerDB } from "../src/DAL/dao/mongoDao/products.dao.mongo.js";
import { expect } from "chai";
import "../src/db/configDB.js"

//"test": "mocha -t 10000 test/products.test.js"

//import "./db-test.js"



describe('Get all products', function() {


    it("should return an object", async function() {

       const objParams ={limit:10, sort:-1, page:1}

        const results= await productManagerDB.findAll(objParams)

        console.log('ACAAAAAIIII',results.payload.length);

        expect(results).to.be.an('object')
        expect(results).to.have.property('payload')
        expect(results.payload).to.be.an('array')
        expect(results.payload).to.have.lengthOf(objParams.limit);
        
        
    }
    )

}

)


describe('GetById Produc', function() {

    it("should return an object", async function() {

    }

    )


}

)