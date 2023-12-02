var express = require("express");
var router = express.Router();

var colmeiaController = require("../controllers/colmeiaController");

router.get("/:empresaId", function (req, res) {
  colmeiaController.buscarcolmeiasPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  colmeiaController.cadastrar(req, res);
})

module.exports = router;