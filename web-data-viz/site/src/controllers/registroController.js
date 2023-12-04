var registroModel = require("../models/registroModel");

function buscarUltimosRegistros(req, res) {
    const limite_linhas = 7;
    var resp = JSON.parse(req.params.idColmeia)
    var idColmeia = resp[0].idColmeia;
    var fkSetor = resp[0].setor;

    console.log(`Recuperando as ultimas ${limite_linhas} registros`);

    registroModel.buscarUltimosRegistros(idColmeia, fkSetor, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas registros.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarRegistrosEmTempoReal(req, res) {

    var resp = JSON.parse(req.params.idColmeia)
    var a = resp[0].idColmeia
    console.log(a, '###############################################')
    console.log(req.params.idColmeia, resp[0])
    var idColmeia = a;
    console.log(idColmeia)
    var fkSetor = resp[0].setor;

    console.log(`Recuperando registros em tempo real`);

    registroModel.buscarRegistrosEmTempoReal(a, fkSetor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas registros.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimosRegistros,
    buscarRegistrosEmTempoReal

}