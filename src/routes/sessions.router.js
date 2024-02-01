import { Router } from "express";
import { generateTokenController, userReqController,restaurarPasswordController } from "../controllers/sessions.controller.js";
import passport from "passport";

import { generateToken } from "../utils/utils.js";

import { transporter } from "../nodemialer.js";

const routerSessions = Router();


/* LOGIN Y SIGNUP MANUAL

routerSessions.post("/signup", async (req, res) => {

  const { name, last_name, email, password } = req.body

  if (!email || !password || !name || !last_name) {

    return res.status(400).json({ message: "Faltan datos requeridos" });

  }

  try {

   const hashedPassword = await hashData(password);

    const createUser = await usersManagerDB.createOne({...req.body, password:hashedPassword});
    res.status(200).json({ message: "User creado", user: createUser })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerSessions.post("/login", async (req, res) => {

  const { email, password } = req.body

  if (!email || !password) {

    return res.status(400).json({ message: "Faltan datos requeridos" });

  }

  try {
    const user = await usersManagerDB.findByEmail(email);

    if (!user) {
      return res.redirect("/api/views/signup")
    }

    //const passwordVald = user.password === password;

    const passwordValdHash= await compareData(password, user.password);

    if (!passwordValdHash) {

      return res.status(404).json({ message: "Clave incorrecta" });

    }

    let correoAdmin = "adminCoder@coder.com";
    let claveAdmin = "adminCod3r123";

    if (password === claveAdmin && email === correoAdmin) {

      req.session.user = { email, name: user.name, isAdmin: true };

    } else {

      req.session.user = { email, name: user.name, isAdmin: false };

    };

    res.redirect("/api/views/products")

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

*/



routerSessions.post("/signup", passport.authenticate("signup"), (req, res) => {

  return res.redirect("/api/views/products")

}


)


routerSessions.post("/login", passport.authenticate("login", { failureMessage: true, failureRedirect: "/api/views/error" }),generateTokenController)



routerSessions.get("/current", passport.authenticate("current", { session: false }), userReqController  )



routerSessions.get("/auth/github", passport.authenticate('github', { scope: ['user:email'] }));



routerSessions.get("/callback", passport.authenticate('github', {
  successRedirect: "/api/views/products",
  failureRedirect: "/api/views/error"
}),)


routerSessions.get("/signout", async (req, res) => {

  req.session.destroy(() => { res.redirect("/api/views/login") })

});


routerSessions.post("/restaurarPassword", restaurarPasswordController  );

//api/session/restaurarPassword


//NUEVO MAILER

routerSessions.post("/mailAvisoPost", 

async (req, res) => {

  const { email} = req.body


  try {

    await transporter.sendMail({

      from:  "INDIRA",
      to: email,
      subject: "MAIL DE RECUPERACION DE CONTRASEÑA",
      html:

      `
      <button><a href="http://localhost:8080/api/views/restaurarPassword" target="_blank">RESTAURAR PASSWORD</a></button>
      
      <p>Si el boton gno funciona, copia y pega la siguiente URL en tu navegador:</p>
      <p>http://localhost:8080/api/views/restaurarPassword</p>
      
      `
  
    
     })
     
     const tokencito = generateToken({email})    
     res.cookie('tokencito', tokencito, { maxAge: 3600000, httpOnly: true })

      //console.log("TOKENCITO", tokencito) 
     res.status(200).json({ message: "MAIL ENVIADO" });
  
   
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }


}


)

export { routerSessions };
