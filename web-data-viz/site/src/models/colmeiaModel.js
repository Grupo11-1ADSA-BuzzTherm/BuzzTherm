var database = require("../database/config");

function buscarColmeiasPorEmpresa(idEmpresa) {

  instrucaoSql = `select * from colmeia a join setor on fkSetor = idSetor where fkEmpresa = ${idEmpresa} `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, descricao) {
  
  instrucaoSql = `insert into (descricao, fkEmpresa) colmeia values (${descricao}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarColmeiasPorEmpresa,
  
  cadastrar
}


