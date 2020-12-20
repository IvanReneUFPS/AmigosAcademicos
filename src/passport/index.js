const GitHubStrategy = require("passport-github2").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const Usuario = require("../models/Usuario");

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:4000/auth/github/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            const {
                avatar_url: foto,
                bio: descripcion,
                email: correo,
                id: githubId,
                name: nombres,
            } = profile._json;
            if (githubId) {
                const userDb = await Usuario.findOne({ githubId }).exec();
                if (userDb) {
                    return done(null, userDb);
                }
                const user = await Usuario.create({
                    correo,
                    descripcion,
                    foto,
                    githubId,
                    nombres,
                });
                if (user) {
                    return done(null, user);
                }
            }
            return done(
                null,
                false,
                req.flash(
                    "error",
                    "No se ha tenido acceso a tu cuenta de github, inténtalo más tarde"
                )
            );
        }
    )
);

passport.use(
    "local-signup",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            let usuario = await Usuario.findOne({ email });
            if (usuario) {
                return done(
                    null,
                    false,
                    req.flash(
                        "error",
                        "El email que ha ingresado ya está asociado a una cuenta"
                    )
                );
            } else {
                usuario = await Usuario.create({
                    email,
                    password,
                    nombres: req.body.nombres,
                });
                if (usuario) {
                    return done(null, usuario);
                }
                return done(
                    null,
                    false,
                    req.flash(
                        "error",
                        "Ha ocurrido un error inesperado, inténtalo nuevamente"
                    )
                );
            }
        }
    )
);
