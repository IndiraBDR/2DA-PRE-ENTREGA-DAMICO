import passport from "passport";
import { UsersManagerDB } from "./dao/managerDB/usersManagerDB.js"
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { hashData, compareData } from "./utils.js";


const usersManagerDB = new UsersManagerDB();

passport.use("signup", new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, email, password, done) => {

    const { name, last_name } = req.body

    if (!email || !password || !name || !last_name) {

        return done(null, false)

    }

    try {

        const hashedPassword = await hashData(password);

        const createUser = await usersManagerDB.createOne({ ...req.body, password: hashedPassword });

        done(null, createUser)


    } catch (error) {
        done(error)
    }
}))


passport.use("login", new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {


    if (!email || !password) {

        return done(null, false)

    }

    try {
        const user = await usersManagerDB.findByEmail(email);

        if (!user) {
            return done(null, false)
        }


        const passwordValdHash = await compareData(password, user.password);

        if (!passwordValdHash) {

            return done(null, false)

        }
        /*
            let correoAdmin = "adminCoder@coder.com";
            let claveAdmin = "adminCod3r123";
        
            if (password === claveAdmin && email === correoAdmin) {
        
              req.session.user = { email, name: user.name, isAdmin: true };
        
            } else {
        
              req.session.user = { email, name: user.name, isAdmin: false };
        
            };
        */
        done(null, user)

    } catch (error) {
        done(error)
    }
}))


passport.use("github", new GitHubStrategy({
    clientID: 'Iv1.15e1a8911be07618',
    clientSecret: 'bc029f89fd4e4db369b04da8b6d31623b1476e53',
    callbackURL: "http://localhost:8080/api/sessions/callback"
},


    async (accessToken, refreshToken, profile, done) => {



        try {

            const userDB = await usersManagerDB.findByEmail(profile._json.email)

            //login

            if (userDB) {
                if (userDB.isGithub) {

                    return done(null, userDB);

                } else {

                    return done(null, false);
                }

            }

            //signup

            const infoUser = {

                name: profile._json.name.split(' ')[0],

                last_name: profile._json.name.split(' ')[1],

                email: profile._json.email,

                password: " ",

                isGithub: true
            }

            const createdUser = await usersManagerDB.createOne(infoUser);

            done(null, createdUser)

        } catch (error) {

            done(error)

        }


    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
})


passport.deserializeUser(async (id, done) => {

    try {

        const user = await usersManagerDB.findById(id)

        done(null, user)

    } catch (error) {

        done(error)

    }



})