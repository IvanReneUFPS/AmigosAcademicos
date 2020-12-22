const Materia = require("../models/Materia");
const Post = require("../models/Post");
const path = require("path");

module.exports = {
    crear: async (req, res) => {
        const { titulo, materia, contenido } = req.body;
        const { nombres, _id, foto } = req.user;
        let fotografia = undefined;
        if (req.file) {
            fotografia = path.join("images", "server", req.file.originalname);
        }
        const materiaDb = await Materia.findById(materia);
        if (materiaDb) {
            console.log(fotografia);
            const post = await Post.create({
                contenido,
                fotografia,
                materia: {
                    nombre: materiaDb.nombre,
                    _id: materiaDb._id,
                },
                titulo,
                usuario: {
                    nombres,
                    _id,
                    foto,
                },
            });
            if (post) {
                return res.redirect("/");
            }
        }
        return res.redirect("/");
    },
};
