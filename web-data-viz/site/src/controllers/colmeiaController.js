var colmeiaModel = require("../models/colmeiaModel");

function buscarColmeiasPorEmpresa(req, res) {
  var fkEmpresa = req.params.fkEmpresa;

  colmeiaModel.buscarcolmeiasPorEmpresa(fkEmpresa).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os colmeias: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function cadastrar(req, res) {
  var descricao = req.body.descricao;
  var idFuncionario = req.body.idFuncionario;

  if (descricao == undefined) {
    res.status(400).send("descricao está undefined!");
  } else if (idFuncionario == undefined) {
    res.status(400).send("idFuncionario está undefined!");
  } else {


    colmeiaModel.cadastrar(descricao, idFuncionario)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  buscarColmeiasPorEmpresa,
  cadastrar
}