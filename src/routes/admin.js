const { Router } = require("express");
const router = Router();
const materiaController = require("../controllers/materiaController");
router.get("/materia", (req, res) => {
    res.render("admin/nueva-materia");
});
router.post("/materia", materiaController.crear);

module.exports = router;
