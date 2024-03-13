import { Router } from "express";
import { generateTokenController, userReqController,restaurarPasswordController, signoutController, sendMailRestPasswordController } from "../controllers/sessions.controller.js";
import passport from "passport";
import {tokenValidationMiddleware, generateTokenMiddleware } from "../middleware/jwt.middleware.js"

const routerSessions = Router();


routerSessions.post("/signup", passport.authenticate("signup",{successRedirect: '/api/views/login',
failureRedirect: '/api/views/error',failureMessage: true}

))

routerSessions.post("/login", passport.authenticate("login",{ failureMessage: true, failureRedirect: "/api/views/error", session: false }),generateTokenMiddleware, (req,res)=>{ return res.redirect("/api/views/products")
})

routerSessions.get("/signout",tokenValidationMiddleware, signoutController);

routerSessions.post("/restaurarPassword", restaurarPasswordController  );

routerSessions.get("/current", passport.authenticate("current", { session: false }), userReqController  )

routerSessions.get("/auth/github", passport.authenticate('github', { scope: ['user:email'] }));

routerSessions.get("/callback", passport.authenticate('github', {
  successRedirect: "/api/views/products",
  failureRedirect: "/api/views/error"
}),)


routerSessions.post("/mailAvisoPost", sendMailRestPasswordController)

export { routerSessions };
