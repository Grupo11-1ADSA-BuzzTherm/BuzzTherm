create database sprint2;

use sprint2;

create table empresa (
idEmpresa int primary key auto_increment,
nome varchar(100) not null,
cnpj char(14)not null,
telefone char(11)not null,
email varchar(80)not null,
senha varchar(25)not null,
areaTerreno float not null,
qtdColmeia int not null
);

describe empresa;

create table usuario(
idUsuario int primary key auto_increment,
login varchar(255)not null,
senha varchar(45)not null,
cargo varchar(45)not null
);

create table colmeia(
idColmeia int primary key auto_increment,
tamanhoCmCubico float not null,
tipoAbelha varchar(50)not null
);

describe colmeia;

create table sensorDHT11(
idSensor int primary key auto_increment
)auto_increment = 100;

describe sensorDHT11;


create table registro(
idRegistro int primary key auto_increment,
dataHora datetime,
temperatura char(4)not null,
umidade char(4)not null
);

describe registro;

show tables;

-- a medida utilizada foi de mil metros quadrados ( 42.72km² = 42.720m² de area)

insert into empresa values
(null, 'Empires Bee', '61696740000107', '11 29893253', 'empires.bee@gmail.com', '123456', '30.000', '56'),
(null, 'To Bee', '00090625000191', '14 24785423', 'tobeecorporation@live.com', '654321', '42.720', '61'),
(null, 'BeeMaid Honey', '17942850000101', '14 29843485', 'beemaidhoney@bol.com.br', '456789', '45.000', '84'),
(null, 'Honey Acres', '30610441000176', '12 28734528', 'honeyacres@hotmail.com', '987654', '35.500', '62');

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