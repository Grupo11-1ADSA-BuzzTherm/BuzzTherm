var express = require("express");
var router = express.Router();

var colmeiaController = require("../controllers/colmeiaController");

router.get("/:fkEmpresa", function (req, res) {
  colmeiaController.buscarColmeiasPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  colmeiaController.cadastrar(req, res);
})

module.exports = router;