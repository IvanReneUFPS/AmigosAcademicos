const { Router } = require("express");
const router = Router();
const loginRouter = require("./login");

router.get("/", (req, res) => {
    if (req.user) {
        return res.render("index", {
            title: "Inicio",
            user: req.user,
        });
    }
    return res.render("login", {
        title: "Iniciar sesión",
    });
});

router.use("/auth", loginRouter);

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;
