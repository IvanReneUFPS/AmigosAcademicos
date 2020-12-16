const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
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
            return done(null, false);
        }
    )
);
