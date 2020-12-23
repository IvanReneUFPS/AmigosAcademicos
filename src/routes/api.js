const { Router } = require("express");
const { route } = require("./login");
const router = Router();
const votosController = require("../controllers/votosController");

router.get("/votoPositivo/:id", votosController.votarPositivo);

router.get("/votoNegativo/:id", votosController.votarNegativo);

module.exports = router;
