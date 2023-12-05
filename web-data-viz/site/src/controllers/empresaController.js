var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}






function cadastrarEndereco(req, res) {
  var cnpjVar = req.body.cnpjServer
  var cepVar = req.body.cepServer
  var logradouroVar = req.body.logradouroServer
  var numeroVar = req.body.numeroServer
  var bairroVar = req.body.bairroServer
  var municipioVar = req.body.municipioServer
  var ufVar = req.body.ufServer


  if (cnpjVar == undefined) {
    res.status(400).send("Seu cnpj está undefined!");
  }
  else if (cepVar == undefined) {
    res.status(400).send("Seu cep está undefined!");
  }
   else if (logradouroVar == undefined) {
    res.status(400).send("Seu logradouro está undefined!");
  }
  else if (numeroVar == undefined) {
    res.status(400).send("Seu numero está undefined!");
  }
  else if (bairroVar == undefined) {
    res.status(400).send("Seu bairro está undefined!");
  }
  else if (municipioVar == undefined) {
    res.status(400).send("Seu municipio está undefined!");
  }
  else if (ufVar == undefined) {
    res.status(400).send("Seu estado está undefined!");

  } else {

    // Passe os valores como parâmetro e vá para o arquivo funcionarioModel.js
    empresaModel.cadastrarEndereco(cnpjVar, cepVar, logradouroVar, numeroVar, bairroVar, municipioVar, ufVar)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}


function cadastrarSetor(req, res) {
  var cnpjVar = req.body.cnpjServer
  var nomeVar= req.body.nomeServer


  if (nomeVar == undefined) {
    res.status(400).send("Seu nome está undefined!");

  } 
  
 else if (cnpjVar == undefined) {
    res.status(400).send("Seu cnpj está undefined!");

  } 
  else {

    // Passe os valores como parâmetro e vá para o arquivo funcionarioModel.js
    empresaModel.cadastrarSetor(cnpjVar,nomeVar)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}



module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  cadastrarEndereco,
  cadastrarSetor
};
