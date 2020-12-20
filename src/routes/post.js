const { Router } = require("express");
const router = Router();
const path = require("path");
const Post = require("../models/Post");

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

module.exports = router;
