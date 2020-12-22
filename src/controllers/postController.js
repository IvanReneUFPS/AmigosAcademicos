const Materia = require("../models/Materia");
const Post = require("../models/Post");
const Respuesta = require("../models/Respuesta");
const path = require("path");
const { findById } = require("../models/Materia");

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
    responder: async (req, res) => {
        const { contenido, _idPregunta } = req.body;
        const { nombres, _id, foto } = req.user;
        let fotografia = undefined;
        if (req.file) {
            fotografia = path.join("images", "server", req.file.originalname);
        }
        let pregunta = await Post.findById(_idPregunta);
        const respuesta = await Respuesta.create({ 
            contenido, 
            fotografia,
            usuario: {
                nombres,
                _id,
                foto,
            },
        });
        pregunta.respuestas.push(respuesta);
        pregunta.save();
        return res.redirect("/");
    },
};
