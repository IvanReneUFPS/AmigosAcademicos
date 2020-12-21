const Post = require("../models/Post");

module.exports = {
    crear: async (req, res) => {
        const { titulo, materia, contenido } = req.body;
        const usuario = req.user._id;
        let fotografia = undefined;
        if (req.file) {
            fotografia = path.join("images", "server", req.file.originalname);
        }
        const post = await Post.create({
            contenido,
            fotografia,
            materia,
            titulo,
            usuario,
        });
        if (post) {
            return res.redirect("/");
        }
        return res.redirect("/");
    },
};
