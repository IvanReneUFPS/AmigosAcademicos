const { Router } = require("express");
const router = Router();
const loginRouter = require("./login");

router.get("/materia", (req, res) => {
    res.render('admin/nueva-materia');
});
router.post("/materia", (req, res) => {
    console.log(req.body)
    res.render('admin/nueva-materia');
});

module.exports = router;
