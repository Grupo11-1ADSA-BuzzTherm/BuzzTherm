var database = require("../database/config");

function buscarcolmeiasPorEmpresa(empresaId) {

  instrucaoSql = `select * from colmeia a join setor on fkSetor = idSetor where fkEmpresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, descricao) {
  
  instrucaoSql = `insert into (descricao, fkEmpresa) colmeia values (${descricao}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarcolmeiasPorEmpresa,
  cadastrar
}
