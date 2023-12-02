var database = require("../database/config");

function buscarUltimosRegistros(idColmeia, idSetor, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        temp as temperatura, 
        umid as umidade,  
                        datahora,
                        FORMAT(datahora, 'HH:mm:ss') as datahora_grafico
                    from registro
                    where fkColmeia = ${idColmeia}
                    order by idRegistro desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        temp as temperatura, 
        umid as umidade,
                        datahora,
                        DATE_FORMAT(datahora,'%H:%i:%s') as datahora_grafico
                    from registro
                    where fkColmeia = ${idColmeia}
                    order by idRegistro desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRegistrosEmTempoReal(idColmeia, idSetor) {
    instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        temp as temperatura, 
        umid as umidade,  
                        CONVERT(varchar, datahora, 108) as datahora_grafico, 
                        fkColmeia 
                        from registro
                        where fkColmeia = ${idColmeia} 
                    order by idRegistro desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        temp as temperatura, 
        umid as umidade,
                        DATE_FORMAT(datahora,'%H:%i:%s') as datahora_grafico, 
                        fkColmeia 
                        from registro
                        where fkColmeia = ${idColmeia}
                    order by idRegistro desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimosRegistros,
    buscarRegistrosEmTempoReal
}
