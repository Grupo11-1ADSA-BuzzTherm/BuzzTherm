var database = require("../database/config");

function buscarPorId(id) {
  var query = `select * from empresa where idEmpresa = '${id}'`;

  return database.executar(query);
}

function listar() {
  var query = `select * from empresa`;

  return database.executar(query);
}

function buscarPorCnpj(cnpj) {
  var query = `select * from empresa where cnpj = '${cnpj}'`;

  return database.executar(query);
}

function cadastrar(razaoSocial, cnpj) {
  var query = `insert into empresa (razao_social, cnpj) values ('${razaoSocial}', '${cnpj}')`;

  return database.executar(query);
}

function cadastrarEndereco(cnpj, cep, logradouro, numero, bairro, municipio, uf) {
  var query= `insert into endereco_empresa (idEndereco, cep, logradouro, numero, bairro, municipio, uf) values (  (select idEmpresa from empresa where cnpj = 
    '${cnpj}'), '${cep}', '${logradouro}', '${numero}', '${bairro}', '${municipio}', '${uf}')`

  return database.executar(query) 
 

}

function cadastrarSetor(cnpj, nome) {
  var query = `insert into setor (nomeFazenda, fkEmpresa) values ('${nome}',   (select idEmpresa from empresa where cnpj = 
    '${cnpj}'))`;

  return database.executar(query);
}


module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar, cadastrarEndereco, cadastrarSetor};
