const { Router } = require("express");
const router = Router();
const loginRouter = require("./login");

router.get("/", (req, res) => {
    return res.render("index", {
        title: "Inicio",
    });
});

router.use("/auth", loginRouter);

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;
