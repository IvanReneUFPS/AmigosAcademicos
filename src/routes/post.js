const { Router } = require("express");
const router = Router();
const path = require("path");
const Post = require("../models/Post");
const Materia = require("../models/Materia");

router.post("/nueva", async (req, res) => {
    const { titulo, materia, contenido } = req.body;
    const usuario = req.user._id;
    let fotografia = undefined;
    if (req.file) {
        fotografia = path.join("images", "server", req.file.originalname);
    }
    const post = await Post.create({ contenido, fotografia, materia, titulo, usuario});
    if (post) {
        return res.redirect('/');
    }
    return res.redirect('/');
});

router.get("/materia/:_id", async (req, res)=>{
    if (req.user) {
        const _id = req.params._id;
        const materias = await Materia.find().lean();
        const preguntas = await Post.find({materia:_id}).lean();
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
