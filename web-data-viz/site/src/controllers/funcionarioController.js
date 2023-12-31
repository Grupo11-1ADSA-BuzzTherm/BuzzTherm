var funcionarioModel = require("../models/funcionarioModel");
 var colmeiaModel = require("../models/colmeiaModel");

 function autenticar(req, res) {
     var email = req.body.emailServer;
     var senha = req.body.senhaServer;

     if (email == undefined) {
         res.status(400).send("Seu email está undefined!");
     } else if (senha == undefined) {
         res.status(400).send("Sua senha está indefinida!");
     } else {
        
         funcionarioModel.autenticar(email, senha)
             .then(
                 function (resultadoAutenticar) {
                     console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                     console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);  //transforma JSON em String

                     if (resultadoAutenticar.length == 1) {
                         console.log(resultadoAutenticar);

                         colmeiaModel.buscarColmeiasPorEmpresa(resultadoAutenticar[0].fkEmpresa) 
                             .then((resultadoColmeias) => {
                                 if (resultadoColmeias.length > 0) {
                                     res.json({
                                         id: resultadoAutenticar[0].idFuncionario,
                                         email: resultadoAutenticar[0].email,
                                         nome: resultadoAutenticar[0].nome,
                                         senha: resultadoAutenticar[0].senha,
                                         colmeias: resultadoColmeias,
                                         cnpj: resultadoAutenticar[0].cnpj,
                                         adm: resultadoAutenticar[0].administrador
                                     });
                                    } else {
                                        //  res.status(204).json({ colmeias: [] });
                                        res.json({
                                            id: resultadoAutenticar[0].idFuncionario,
                                            email: resultadoAutenticar[0].email,
                                            nome: resultadoAutenticar[0].nome,
                                            senha: resultadoAutenticar[0].senha,
                                            colmeias: 'sem colmeias',
                                            cnpj: resultadoAutenticar[0].cnpj,
                                            adm: resultadoAutenticar[0].administrador
                                        });
                                 }
                             })
                     } else if (resultadoAutenticar.length == 0) {
                         res.status(403).send("Email e/ou senha inválido(s)");
                     } else {
                         res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                     }
                 }
             ).catch(
                 function (erro) {
                     console.log(erro);
                     console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                   res.status(500).json(erro.sqlMessage);
                 }
             );
    }

 }

function cadastrar(req, res) {

    var razao = req.body.razaoSocialServer
    var nome = req.body.nomeFantasiaServer
    var cnpj = req.body.cnpjServer
    var email = req.body.emailServer
    var telefone = req.body.telefoneServer
    var planos = req.body.planoServer
     

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    }
    else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    }
     else if (razao == undefined) {
        res.status(400).send("Sua razao social está undefined!");
    }
     else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    }
    else if (planos== undefined) {
        res.status(400).send("Seu plano está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo funcionarioModel.js
        funcionarioModel.cadastrar(nome, email, telefone, planos, cnpj, razao)
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

function cadastrarFunc(req, res) {

    var nome = req.body.nomeServer
    var cnpj = req.body.cnpjServer
    var email = req.body.emailServer
    var senha = req.body.senhaServer
    var adm = req.body.admServer
     
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    }
    else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    }
     else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo funcionarioModel.js
        funcionarioModel.cadastrarFunc(nome, email, senha, cnpj, adm)
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
    autenticar,
    cadastrar,
    cadastrarFunc
}