const { Router } = require("express");
const router = Router();
const loginRouter = require("./login");
const adminRouter = require("./admin");
const postRouter = require("./post");
const Materia = require("../models/Materia");
const Post = require("../models/Post");

router.get("/", async(req, res) => {
    if (req.user) {
        const materias = await Materia.find().lean();
        const preguntas = await Post.find().lean();
        return res.render("index", {
            title: "Inicio",
            user: req.user,
            esAdmin: () => req.user.rol === "Administrador",
            materias,
            preguntas,
        });
    }
    return res.render("login", {
        title: "Iniciar sesión",
    });
});

router.use("/auth", loginRouter);
router.use("/admin", adminRouter);
router.use("/post", postRouter);

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;
