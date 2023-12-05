var alertasTemp = [];
var alertasUmid = [];
var setor = JSON.parse(sessionStorage.COLMEIAS)[0].fkSetor

function obterdados(idColmeia) {
        var idColmeiasetor = JSON.stringify([{idColmeia, setor}])
        console.log(idColmeia)
        fetch(`/registros/tempo-real/${idColmeiasetor}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${resposta[0].temperatura}`);
                    console.log(`Dados recebidos: ${resposta[0].umidade}`);

                    alertarTemp(resposta, idColmeia);
                    alertarUmid(resposta, idColmeia);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${idColmeia} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do colmeia p/ gráfico: ${error.message}`);
        });

}

function alertarTemp(resposta, idColmeia) {
    var temp = resposta[0].temperatura;
    var dtHora = resposta[0].datahora_grafico;

    var grauDeAviso = '';

    var limites = {
        muito_quente: 39,
        quente: 37,
        frio: 32,
        muito_frio: 29.5
    };

    var classeAlerta = 'alerta-verde';

    if (temp >= limites.muito_quente) {
        classeAlerta = 'situacao-inoperante alerta-vermelho';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'vermelho'
        exibirAlertaTemp(temp, idColmeia, grauDeAviso, grauDeAvisoCor, dtHora, 'Temperatura;ºC', classeAlerta)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classeAlerta = 'alerta-quente alerta-amarelo';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'amarelo'
        exibirAlertaTemp(temp, idColmeia, grauDeAviso, grauDeAvisoCor, dtHora, 'Temperatura;ºC', classeAlerta)
    }
    else if (temp < limites.quente && temp > limites.frio) {
        removerAlertaTemp(idColmeia)
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classeAlerta = 'alerta-frio alerta-amarelo';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'amarelo'
        exibirAlertaTemp(temp, idColmeia, grauDeAviso, grauDeAvisoCor, dtHora, 'Temperatura;ºC', classeAlerta)
    }
    else if (temp <= limites.muito_frio) {
        classeAlerta = 'situacao-inoperante alerta-vermelho';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'vermelho'
        exibirAlertaTemp(temp, idColmeia, grauDeAviso, grauDeAvisoCor, dtHora, 'Temperatura;ºC', classeAlerta)
    }

    var card, dash;

    if (document.getElementById(`temp_colmeia_${idColmeia}`) != null) {
        document.getElementById(`temp_colmeia_${idColmeia}`).innerHTML = temp + "°C";
    }

    if (document.getElementById(`card_temp_${idColmeia}`)) {
        card = document.getElementById(`card_temp_${idColmeia}`)
        card.className = classeAlerta;
    }

    if (document.getElementById(`chartTemp${idColmeia}`)) {
        dash = document.getElementById(`chartTemp${idColmeia}`)
        dash.className = classeAlerta;
    }

}

function alertarUmid(resposta, idColmeia) {
    var umid = resposta[0].umidade;
    var dtHora = resposta[0].datahora_grafico;

    var grauDeAviso = '';

    var limitesUmid = {
        muito_umido: 70,
        umido: 60,
        seco: 50,
        muito_seco: 41
    };

    var classeAlerta = 'alerta-verde';
    
    if (umid >= limitesUmid.muito_umido) {
        classeAlerta = 'situacao-inoperante alerta-vermelho';
        grauDeAviso = 'perigo umido'
        grauDeAvisoCor = 'vermelho'
        exibirAlertaUmid(umid, idColmeia, grauDeAviso, grauDeAvisoCor, dtHora, 'Umidade;%', classeAlerta)
    }
    else if (umid < limitesUmid.muito_umido && umid >= limitesUmid.umido) {
        classeAlerta = 'alerta-amarelo';
        console.log(umid, limitesUmid.umido)
        grauDeAviso = 'alerta umido'
        grauDeAvisoCor = 'amarelo'
        exibirAlertaUmid(umid, idColmeia, grauDeAviso, grauDeAvisoCor, dtHora, 'Umidade;%', classeAlerta)
    }
    else if (umid < limitesUmid.umido && umid > limitesUmid.seco ) {
        removerAlertaUmid(idColmeia);
    }
    else if (umid <= limitesUmid.seco && umid > limitesUmid.muito_seco) {
        classeAlerta = 'alerta-amarelo';
        grauDeAviso = 'alerta seco'
        grauDeAvisoCor = 'amarelo'
        exibirAlertaUmid(umid, idColmeia, grauDeAviso, grauDeAvisoCor, dtHora, 'Umidade;%', classeAlerta)
    }
    else if (umid <= limitesUmid.muito_seco) {
        classeAlerta = 'situacao-inoperante alerta-vermelho';
        grauDeAviso = 'perigo seco'
        grauDeAvisoCor = 'vermelho'
        exibirAlertaUmid(umid, idColmeia, grauDeAviso, grauDeAvisoCor, dtHora, 'Umidade;%', classeAlerta)
    }

    var card, dash;

    if (document.getElementById(`umid_colmeia_${idColmeia}`) != null) {
        document.getElementById(`umid_colmeia_${idColmeia}`).innerHTML = umid + "%";
    }

    if (document.getElementById(`card_umid_${idColmeia}`)) {
        card = document.getElementById(`card_umid_${idColmeia}`)
        card.className = classeAlerta;
    }

    if (document.getElementById(`chartUmi${idColmeia}`)) {
        dash = document.getElementById(`chartUmi${idColmeia}`)
        dash.className = classeAlerta;
    }
}

function exibirAlertaTemp(temp, idColmeia, grauDeAviso, grauDeAvisoCor, dtHora, tipo, classeAlerta) {
    var indice = alertasTemp.findIndex(item => item.idColmeia == idColmeia);

    if (indice >= 0) {
        alertasTemp[indice] = { idColmeia, temp, grauDeAviso, grauDeAvisoCor, dtHora, tipo, classeAlerta}
    } else {
        alertasTemp.push({ idColmeia, temp, grauDeAviso, grauDeAvisoCor, dtHora, tipo, classeAlerta});
    }

    exibirCards();
}

function exibirAlertaUmid(temp, idColmeia, grauDeAviso, grauDeAvisoCor, dtHora, tipo, classeAlerta) {
    var indice = alertasUmid.findIndex(item => item.idColmeia == idColmeia);
    console.log(temp, 'temppp', indice)

    if (indice >= 0) {
        alertasUmid[indice] = { idColmeia, temp, grauDeAviso, grauDeAvisoCor, dtHora, tipo, classeAlerta}
    } else {
        alertasUmid.push({ idColmeia, temp, grauDeAviso, grauDeAvisoCor, dtHora, tipo, classeAlerta});
    }

    exibirCards();
}

function removerAlertaTemp(idColmeia) {
    alertasTemp = alertasTemp.filter(item => item.idColmeia != idColmeia);
    exibirCards();
}

function removerAlertaUmid(idColmeia) {
    alertasUmid = alertasUmid.filter(item => item.idColmeia != idColmeia);
    exibirCards();
}

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertasTemp.length; i++) {
        var mensagem = alertasTemp[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
    for (var i = 0; i < alertasUmid.length; i++) {
        var mensagem = alertasUmid[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ idColmeia, temp, grauDeAviso, grauDeAvisoCor, dtHora, tipo, classeAlerta}) {
    var tipos = tipo.split(';');
    var descricao = JSON.parse(sessionStorage.COLMEIAS).find(item => item.idColmeia == idColmeia).idColmeia;
    return `
        <li id="card_${idColmeia}_${tipos[0]}">
            <div class="li-flex ${classeAlerta}">
                <div class="msg-alerta">
                    <div class="texto-icone-alerta">
                        <img src="assets/imgs/alerta-${grauDeAvisoCor}.png" alt="">
                        <span class="texto-alerta">
                            <h5>Colmeia #${descricao} está em estado de ${grauDeAviso}!</h5>
                            <small>${tipos[0]} ${temp}${tipos[1]}</small>
                        </span>
                    </div>
                    <div class="datahora-alerta">
                       ${dtHora}
                    </div>
                </div>
            </div>
        </li>
    `;
}

function atualizacaoPeriodica() {
    JSON.parse(sessionStorage.COLMEIAS).forEach(item => {
        obterdados(item.idColmeia)
    });
    setTimeout(atualizacaoPeriodica, 5000);
}
