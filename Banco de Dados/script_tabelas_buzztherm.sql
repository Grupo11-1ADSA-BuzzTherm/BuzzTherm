create database buzztherm;

use buzztherm;

create table empresa (
    idEmpresa int primary key auto_increment,
    razaoSocial varchar(60),
    nomeFantasia varchar(60),
    cnpj char(14) unique,
    email varchar(80),
    telefone char(11),
    planoAtual varchar(45),
    fkFilial int,
    constraint fkFilialEmpresa foreign key (fkFilial)
        references empresa(idEmpresa)
);

create table endereco_empresa (
    idEndereco int primary key,
    constraint fkEnderecoEmpresa foreign key (idEndereco)
        references empresa(idEmpresa),
    logradouro varchar(80),
    cep char(8),
    numero varchar(5),
    bairro varchar(45),
    uf char(2),
    municipio varchar(45)
);

create table funcionario (
    idFuncionario int primary key auto_increment,
    nome varchar(45) not null,
    email varchar(60) not null,
    senha varchar(60) not null,
    administrador tinyint not null,
    cnpjEmpresa char(14),
    constraint fkFuncionarioEmpresa foreign key (cnpjEmpresa)
        references empresa(cnpj)
);

create table setor (
    idSetor int primary key auto_increment,
    nomeFazenda varchar(60),
    fkEmpresa int,
    constraint fkSetorEmpresa foreign key (fkEmpresa)
        references empresa(idEmpresa)
);

create table colmeia (
    idColmeia int primary key auto_increment,
    descricao varchar(90),
    qtdQuadros int,
    tipo varchar(45),
    situacaoSensor tinyint,
    fkSetor int,
    constraint fkColmeiaSetor foreign key (fkSetor)
        references setor(idSetor)
);

create table registro (
    idRegistro int primary key auto_increment,
    dataHora datetime default current_timestamp,
    temp decimal(4,2),
    umid decimal(4,2),
    fkColmeia int,
    constraint fkRegistroColmeia foreign key (fkColmeia)
        references colmeia(idColmeia)
);

