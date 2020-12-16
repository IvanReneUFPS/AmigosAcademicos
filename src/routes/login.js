const { Router } = require("express");
const passport = require("passport");
const router = Router();

router.get("/", (req, res) => {
    return res.redirect("/");
});

router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
    "/github/callback",
    passport.authenticate("github", {
        successRedirect: "/",
        failureRedirect: "/auth",
        passReqToCallback: true,
    })
);

module.exports = router;
