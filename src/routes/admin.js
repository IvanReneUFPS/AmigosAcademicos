const { Router } = require("express");
const router = Router();
const path = require('path');
const loginRouter = require("./login");
const Materia = require("../models/Materia");

router.get("/materia", (req, res) => {
    res.render('admin/nueva-materia');
});
router.post("/materia", async (req, res) => {
    const { nombre, descripcion} = req.body;
    const fotografia = path.join("images","materias", req.file.originalname);
    const materia = await Materia.create({
        nombre, 
        descripcion,
        fotografia
    });
    if(materia){
        return res.redirect('/admin/materia');
    }
    return res.redirect('/admin/materia');
});

module.exports = router;
