create database sprint2;

use sprint2;

create table empresa (
idEmpresa int primary key auto_increment,
nome varchar(100) not null,
cnpj char(14)not null,
email varchar(80)not null,
qtdColmeia int not null,
planoAtual varchar(45)
constraint chkplan check(planoAtual in("Mensal","Semestral","Anual"))
)auto_increment=1000;

desc empresa;

create table funcionario(
idFuncionario int primary key auto_increment,
login varchar(255)not null,
senha varchar(45)not null,
cargo varchar(45)not null,
fkEmpresa int,
foreign key(fkEmpresa) references empresa(idEmpresa)
);

desc funcionario;

create table telefone(
idTelefone int primary key auto_increment,
telefone1 char(11),
telefone2 char(11),
telefone3 char(11),
fkEmpresa int,
foreign key(fkEmpresa) references empresa(idEmpresa)
);

desc telefone;

create table endereco(
idEndereco int primary key auto_increment,
cep char(8),
lograduro varchar(255),
numero int,
fkEmpresa int,
foreign key(fkEmpresa) references empresa(idEmpresa)
);

desc endereco;

create table colmeia(
idColmeia int primary key auto_increment,
tamanho char(3) not null,
tipoColmeia varchar(50)not null,
fkEmpresa int,
foreign key(fkEmpresa) references empresa(idEmpresa)
)auto_increment=100;

desc colmeia;

create table sensorDHT11(
idSensor int auto_increment,
fkColmeia int,
foreign key(fkColmeia) references colmeia(idColmeia),
situacao tinyint,
primary key(idSensor, fkColmeia)
);

desc sensorDHT11;


create table registro(
idRegistro int auto_increment,
dataHora datetime,
temp float not null,
umid float not null,
fkSensor int,
foreign key (fkSensor) references sensorDHT11(idSensor),
primary key(idRegistro, fkSensor)
);

desc registro;

show tables;

-- a medida utilizada foi de mil metros quadrados ( 42.72km² = 42.720m² de area)

insert into empresa values
(null, 'Empires Bee', '61696740000107', 'empires.bee@gmail.com', '450', 'Semestral'),
(null, 'To Bee', '00090625000191', 'tobeecorporation@live.com', '395', 'Mensal'),
(null, 'BeeMaid Honey', '17942850000101', 'beemaidhoney@bol.com.br', '420', 'Anual'),
(null, 'Honey Acres', '30610441000176', 'honeyacres@hotmail.com', '339', 'Semestral');

-- use para mostrar o erro do check
insert into empresa values
(null, 'Empires', '61', 'empires@gmail.com', '45', 'Semanal');

-- parei aqui






select * from empresa;

insert into usuario values 
(null, 'marcio.rocha12', '4523', 'Vice-Presidente'),
(null, 'yasmin.raviero34', '3258', 'Supervisora'),
(null, 'pedro.salvatore98', '4789', 'Gerente Adminstrativo'),
(null, 'maria.silva87', '3214', 'Gerente Administrativa');

select * from usuario;

-- a unidade de medida utilizada foi de centrimetros cubicos ex(50055.60cm3 = 50.5 * 41.3 * 24.4)

insert into colmeia values
(null, '50055.60', 'Uruçu'),
(null, '49254.45', 'Europeia'),
(null, '45157.50', 'Africanizada'),
(null, '36457.59', 'Jandaíra');

select * from colmeia;

insert into sensorDHT11 values
(null),
(null),
(null),
(null),
(null),
(null),
(null),
(null);

select * from sensorDHT11;

-- o ultimo valor inserido é lido em porcentagem

insert into registro values
(null, '2023-09-23 08:54:48', '23.4', '54.5'),
(null, '2023-09-23 10:40:30', '29.0', '60'),
(null, '2023-09-24 09:54:48', '28.3', '68.2'),
(null, '2023-09-24 11:04:20', '22.1', '45.8'),
(null, '2023-09-23 6:00:39', '25.4', '40'),
(null, '2023-09-23 08:30:00', '25.4', '64.6'),
(null, '2023-09-24 07:45:29', '20', '50'),
(null, '2023-09-24 08:45:42', '26', '68.2');

select dataHora as 'Horário',
		temperatura as 'Temperatura(C°)',
        umidade as ' umidade(%)'
		from registro;

-- adcicionei A foreign key a tabela usuario

alter table usuario add column fkUempresa int,
	add foreign key (fkUempresa)
    references empresa(idEmpresa);
    
describe usuario;
    
update usuario set fkUempresa = 1
	where idUsuario = 3;
    
update usuario set fkUempresa = 2
	where idUsuario = 1; 
    
update usuario set fkUempresa = 3
	where idUsuario = 2;
    
update usuario set fkUempresa = 4
	where idUsuario = 4;
	
select empresa.nome as 'Empresa',
		usuario.login as 'Encarregado',
        usuario.senha as 'Senha',
        usuario.cargo as 'Cargo'
        from empresa join usuario
        on idEmpresa = fkUempresa;


-- Adicionei a chave estrangeira na tabela colmeia

alter table colmeia add column fkempresa int,
	add foreign key(fkempresa)
    references empresa(idEmpresa);

update colmeia set fkempresa = 2
	where idColmeia = 2;
    
update colmeia set fkempresa = 1
	where idColmeia = 4;
    
update colmeia set fkempresa = 4
	where idColmeia = 3;
    
update colmeia set fkempresa = 3
	where idColmeia = 1;
    
select nome as 'empresa',
		qtdColmeia as 'Colmeias',
        tipoAbelha as 'Abelha'
		from colmeia join empresa
        on idEmpresa = fkempresa;

alter table sensorDHT11 add column fkColmeia int,
	add foreign key (fkColmeia)
    references colmeia(idColmeia);
    
update sensorDHT11 set fkColmeia = 1
	where idSensor in(1,2);
    
update sensorDHT11 set fkColmeia = 2
	where idSensor in (7,8);

update sensorDHT11 set fkColmeia = 3
	where idSensor in (3,4);
    
update sensorDHT11 set fkColmeia = 4
	where idSensor in (5,6);
    
select * from empresa 
	inner join colmeia 
	on idEmpresa = fkEmpresa
    inner join sensorDHT11
    on idColmeia = fkColmeia;
    
alter table registro add column fkSensor int,
	add foreign key(fkSensor)
	references sensorDHT11(idSensor);
    
update registro set fkSensor = 1
	where idRegistro in(1,2);
    
update registro set fkSensor = 2
	where idRegistro in(7,8);
    
update registro set fkSensor = 3
	where idRegistro in(5,6);
    
update registro set fkSensor = 4
	where idRegistro in(3,4);
    
select sensorDHT11.idSensor as 'Sensor',
		registro.dataHora as 'Horário',
		registro.temperatura as 'Temperatura(C°)',
        registro.umidade as ' umidade(%)'
		from registro join sensorDHT11
        on idSensor = fkSensor;