import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { tokenValidationMiddleware } from "../middleware/jwt.middleware.js";
import { renderCartIdController, renderChatController, renderDocumentsController, renderErrorController, renderHomeController, renderLoggerTestController, renderLoginController, renderProductsController, renderProfileController, renderRealTimeProductsController, renderSignupController, renderUserSettingController, renderViewsRestPassController, renderViewsSendMailRestPassController, } from "../controllers/views.controller.js";


const routerViews = Router();

routerViews.get("/", renderHomeController);
routerViews.get("/realtimeproducts", renderRealTimeProductsController);
routerViews.get("/chat", tokenValidationMiddleware, authMiddleware(["user"]), renderChatController);
routerViews.get("/products", tokenValidationMiddleware, renderProductsController);
routerViews.get("/carts/:cartId", renderCartIdController);
routerViews.get("/login", renderLoginController);
routerViews.get("/signup", renderSignupController);
routerViews.get("/profile", renderProfileController);
routerViews.get("/mailAviso", renderViewsSendMailRestPassController);
routerViews.get("/restaurarPassword", renderViewsRestPassController);
routerViews.get('/loggerTest', renderLoggerTestController)
routerViews.get('/documents', tokenValidationMiddleware, renderDocumentsController)
routerViews.get('/error', renderErrorController)
routerViews.get("/userSetting/:userId", tokenValidationMiddleware, authMiddleware(["admin"]), renderUserSettingController)



export { routerViews };



