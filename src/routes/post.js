const { Router } = require("express");
const router = Router();
const Post = require("../models/Post");
const Materia = require("../models/Materia");
const postController = require("../controllers/postController");

router.post("/nueva", postController.crear);

router.get("/materia/:_id", async (req, res) => {
    if (req.user) {
        const _id = req.params._id;
        const materias = await Materia.find().lean();
        const preguntas = await Post.find({ materia: _id }).lean();
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

module.exports = router;
