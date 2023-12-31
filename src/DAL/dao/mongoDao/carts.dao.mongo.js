import { cartsModel } from "../../models/carts.model.js";
import { BasicManagerDB} from "../../dao/mongoDao/basic.dao.mongo.js";
import { CustomError } from "../../../errors/error.generator.js";
import { errorsMessages } from "../../../errors/errors.enum.js";

class CartManagerDB extends BasicManagerDB{

    constructor() {

        super(cartsModel)
    } 

   

    async findCartById(idCart) {

        const response = await cartsModel.findById(idCart).populate("products.product");
        return response;

    };

    async createOneCart() {

        const newCart = { products: [] };

        const response = await cartsModel.create(newCart);
        return response;

    };

    async addProductToCart(idCart, idProduct) {

        const cart = await cartsModel.findById(idCart);

        const productIndex = cart.products.findIndex(
            (item) => item.product.equals(idProduct)

        );

        if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
        } else {
            cart.products.push({ product: idProduct, quantity: 1 });
        }

        return cart.save()

    };



    async addProductToCartQuantity(idCart, idProduct, quantity) {

        const cart = await cartsModel.findById(idCart);

        const productIndex = cart.products.findIndex(
            (item) => item.product.equals(idProduct)
        );

        if (productIndex !== -1) {

            cart.products[productIndex].quantity = quantity;

            /* 
            SUMAR LA CANTIDAD RECIBIDA POR BODY
 
            cart.products[productIndex].quantity = cart.products[productIndex].quantity + quantity*/

        } else {
            cart.products.push({ product: idProduct, quantity: 1 });
        }

        return cart.save()

    };


//este
    async updateCart(cartId, newProductBody) {

        const cartById = await cartsModel.findById(cartId);

        const newProduct = newProductBody;

       // console.log(cartById.products);

        // console.log(newProduct);

        cartById.products = newProduct;

        await cartById.save()

        return cartById

    };


    async deleteOne(idCart) {
        try {

            const response = await cartsModel.deleteOne({ _id: idCart });
            return response

        } catch (error) {
            return error;
        }
    }


    async deleteProductToCart(idCart, idProduct) {

        const cart = await cartsModel.findById(idCart);

        const productIndex = cart.products.findIndex(p => p.product._id.equals(idProduct));


        if (productIndex === -1) {

            return cart
            
        }

        cart.products.splice(productIndex, 1);

        await cart.save();

        return cart;


    };

    async deleteTotalProductToCart(idCart) {

        const cart = await cartsModel.findById(idCart);

        cart.products = [];

        await cart.save()

        return cart

    };

}

export const cartManagerBD = new CartManagerDB();

export { CartManagerDB };