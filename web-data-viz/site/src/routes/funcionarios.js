var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de funcionarioController.js
router.post("/cadastrar", function (req, res) {
    funcionarioController.cadastrar(req, res);
})

router.post("/cadastrarFunc", function (req, res) {
    funcionarioController.cadastrarFunc(req, res);
})

module.exports = router;