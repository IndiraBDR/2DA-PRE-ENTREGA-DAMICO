import { logger } from "../logger.js";
import { findAllServ } from "../services/products.service.js";
import { findCartByIdServ } from "../services/carts.service.js";
import { findByIdServ } from "../services/users.service.js";


export const renderHomeController = async (req, res) => {


    let products = await findAllServ(req.query)

    let productsDB = products.payload

    const productsObject = productsDB.map(p => p.toObject());

    res.render("home", {
        products: productsObject,
    });
}

export const renderRealTimeProductsController = async (req, res) => {
    res.render("realTimeProducts");
}

export const renderChatController = async (req, res) => {
    res.render("chat");
}


export const renderProductsController = async (req, res) => {

    let products = await findAllServ(req.query)
    let productsDB = products.payload
    const productsObject = productsDB.map(p => p.toObject());
    const { name } = req.user


    res.render("products", {
        productsData: productsObject,
        user: { name },
        style: "product"
    });


}


export const renderCartIdController = async (req, res) => {

    const { cartId } = req.params
    let cartById = await findCartByIdServ(cartId)
    let cartArray = cartById.products;

    const cartArrayObject = cartArray.map(doc => doc.toObject());

    res.render("cart", {
        cartData: cartArrayObject
    });


}


export const renderUserSettingController = async (req, res) => {

    const { userId } = req.params


    const userById = await findByIdServ(userId)

    if (!userById) {

        return res.render("userSetting", { user: "VACIO" });

    }

    const userData = userById.toObject()


    res.render("userSetting", { user: userData, userId });

}


export const renderLoginController = async (req, res) => {

    res.render("login")

}

export const renderSignupController = async (req, res) => {

    res.render("signup")

}

export const renderProfileController = async (req, res) => {

    res.render("profile")

}


export const renderViewsSendMailRestPassController = async (req, res) => {

    res.render("mailAviso")

}

export const renderViewsRestPassController = async (req, res) => {

    if (!req.cookies.tokencito) {

        return res.redirect('/api/views/mailAviso')

    } else {

        res.render("restaurarPassword")

    }

}


export const renderLoggerTestController = async (req, res) => {

    logger.error("PROBANDO LOGGER ERROR")
    logger.fatal("PROBANDO LOGGER FATAL")
    logger.warning("PROBANDO LOGGER WARNING")
    logger.http("PROBANDO LOGGER HTTP")
    logger.debug("PROBANDO LOGGER DEBUG")
    logger.info("PROBANDO LOGGER INFO")

    res.render("loggerTest")


}


export const renderDocumentsController = async (req, res) => {

    const id = req.user._id

    res.render("documents", { id })

}

export const renderErrorController = async (req, res) => {

    const reqMessages = req.session.messages;
    const message = reqMessages[reqMessages.length - 1]
    console.log("HEY", message);


    res.render("error", { message })
}