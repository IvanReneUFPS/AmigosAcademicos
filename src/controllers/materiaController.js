const Materia = require("../models/Materia");
const path = require("path");
module.exports = {
    crear: async (req, res) => {
        const { nombre, descripcion } = req.body;
        const fotografia = path.join("images", "server", req.file.originalname);
        const materia = await Materia.create({
            nombre,
            descripcion,
            fotografia,
        });
        if (materia) {
            return res.redirect("/admin/materia");
        }
        return res.redirect("/admin/materia");
    },
};
