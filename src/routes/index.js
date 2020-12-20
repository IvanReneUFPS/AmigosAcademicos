const { Router } = require("express");
const router = Router();
const loginRouter = require("./login");
const adminRouter = require("./admin");

router.get("/", (req, res) => {
    if (req.user) {
        return res.render("index", {
            title: "Inicio",
            user: req.user,
            esAdmin: () => req.user.rol === "Administrador",
        });
    }
    return res.render("login", {
        title: "Iniciar sesión",
    });
});

router.use("/auth", loginRouter);
router.use("/admin", adminRouter);

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;
