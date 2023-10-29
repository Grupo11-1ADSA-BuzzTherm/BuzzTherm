create database bdBuzzTherm;

use bdBuzzTherm;

create table empresa (
idEmpresa int primary key auto_increment,
razaoSocial varchar(100) not null,
nomeFantasia varchar(100) not null,
cnpj char(14)not null,
enderecoEmpresa varchar(255) not null,
uf varchar(2) not null,
email varchar(80)not null,
telefone1 char(11),
telefone2 char(11),
qtdColmeia int not null,
planoAtual varchar(45)
constraint chkplan check(planoAtual in("Mensal","Semestral","Anual")),
fkFilial int not null ,
foreign key (fkFilial) references empresa(idEmpresa)
)auto_increment=1000;

desc empresa;

create table funcionario(
idFuncionario int primary key auto_increment,
login varchar(255)not null,
senha varchar(45)not null,
cargo varchar(45)not null,
fkEmpresa int not null,
foreign key(fkEmpresa) references empresa(idEmpresa)
);

desc funcionario;

create table setor(
idSetor int primary key auto_increment,
nomeFazenda varchar(255),
fkEmpresa int,
foreign key(fkEmpresa) references empresa(idEmpresa)
);

desc setor;

create table colmeia(
idColmeia int auto_increment,
qtdQuadros int not null,
tipoColmeia varchar(50)not null,
fkSetor int not null,
foreign key(fkSetor) references setor(idSetor),
primary key (idColmeia,fkSetor)
)auto_increment=10;

desc colmeia;

create table sensorDHT11(
idSensor int primary key auto_increment,
situacao tinyint,
fkColmeia int,
foreign key(fkColmeia) references colmeia(idColmeia),
fkSetor int,
foreign key (fkSetor) references setor(idSetor)
);

desc sensorDHT11;


create table registro(
idRegistro int primary key auto_increment,
dataHora datetime,
temp float not null,
umid float not null,
fkSensor int not null,
foreign key (fkSensor) references sensorDHT11(idSensor)
);

desc registro;

alter table empresa modify column fkFilial int null;

show tables;

insert into empresa(idEmpresa,razaoSocial,nomeFantasia,cnpj,enderecoEmpresa,uf,email,telefone1,telefone2,qtdColmeia,planoAtual)values
(null, 'Empires Bee Industria LTDA','Empires Bee', '61696740000107', 'Avenida Paulista, 39', 'SP', 'empires.bee@gmail.com', '11984568569' , '11986653365', 450, 'Semestral'),
(null, 'Empires Bee Industria LTDA','Empires To Bee', '00090625000191', 'Santo Amaro, 340', 'SP', 'tobeecorporation@live.com', '11986547953', '11985447442', 395, 'Semestral'),
(null, 'BeeMaid Honey Agronégocio LTDA','BeeMaid Honey', '17942850000101', 'Alameda Virturiosa, 1300', 'RJ', 'beemaidhoney@bol.com.br', '21975621355', '21957466621', 420, 'Anual'),
(null, 'BeeMaid Honey Agronégocio LTDA','beeMaid Honey Acres', '30610441000176', 'Rua Dom Pedro II, 804', 'RJ', 'honeyacres@hotmail.com', '21954623348', '21954785981', 339,'Anual');

select * from empresa; 

update empresa set fkFilial = 1000
where idEmpresa = 1001;

update empresa set fkFilial = 1002
where idEmpresa = 1003;

-- use para mostrar o erro do check
-- insert into empresa values
-- (null, 'Empires', '61', 'empires@gmail.com', '45', 'Semanal');

insert into funcionario values 
(null, 'marcio.rocha12', '4523', 'Vice-Presidente', 1000),
(null, 'ana.maria23', '6543', 'Presidente', 1000),
(null, 'carlos.henrique90', '9817', 'Supervisor Lógistico', 1003),
(null, 'yasmin.raviero34', '3258', 'Supervisora', 1003),
(null, 'pedro.salvatore98', '4789', 'Gerente Adminstrativo', 1001),
(null, 'maria.silva87', '3214', 'Gerente Administrativa', 1002);

select * from funcionario;

select 
funcionario.login,
Empresa.nomeFantasia
from funcionario
join empresa as Empresa
on funcionario.fkEmpresa = Empresa.idEmpresa
left join empresa as filial
on filial.fkFilial = Empresa.idEmpresa;

insert into setor values
(null, "Fazenda da Terra Doce", 1002),
(null, "Fazenda Cavalcante", 1000),
(null, "Fazenda Terra Fértil", 1001),
(null, "Fazenda do Vale Dourado", 1003);

select * from setor;

select * from setor 
join empresa as Empresa
on setor.fkEmpresa = Empresa.idEmpresa
left join empresa as Filial
on Filial.fkFilial = Empresa.idEmpresa;

insert into colmeia values
(null, '7', 'ninho',1),
(null, '6', 'melgueira',2),
(null, '7', 'melgueira rasa',4),
(null, '8', 'ninho',3),
(null, '9', 'melgueira',1),
(null, '7', 'melgueira',1),
(null, '8', 'melgueira rasa',4);

select * from colmeia;

select * from colmeia
join setor
on fkSetor = idSetor
join empresa
on fkEmpresa = idEmpresa;

insert into sensorDHT11 values
(null, 1, 10, 1),
(null, 1, 12, 4),
(null, 1, 14, 1),
(null, 1, 13, 3),
(null, 0, 15, 1),
(null, 1, 16, 4),
(null, 1, 11, 2);

select * from sensorDHT11;

select * from sensorDHT11 as sensor
join colmeia
on fkColmeia = idColmeia
inner join setor
on sensor.fkSetor = setor.idSetor;

-- o ultimo valor inserido é lido em porcentagem

insert into registro values
(null, '2023-09-23 08:54:48', '23.4', '54.5',1),
(null, '2023-09-23 10:40:30', '29.0', '60',3),
(null, '2023-09-24 09:54:48', '28.3', '68.2',7),
(null, '2023-09-24 11:04:20', '35', '45.8',5),
(null, '2023-09-23 6:00:39', '33', '40',2),
(null, '2023-09-23 08:30:00', '31', '64.6',4),
(null, '2023-09-24 08:45:42', '34', '68.2',6);

select 
idSensor as 'Sensor',		
dataHora as 'Horário',
temp as 'Temperatura(C°)',
umid as ' umidade(%)'
from sensorDHT11
right join registro
on fkSensor = idSensor;

select 
sen.idSensor as 'Sensor',
r.temp as 'Temperatura',
r.umid as 'Umidade',
r.dataHora as 'Hórario',
c.idColmeia as 'Colmeia',
st.nomeFazenda as 'Fazenda',
e.nomeFantasia as 'Empresa',
e.uf as 'Estado'
from registro as r
join sensorDHT11 as sen
on r.fkSensor = sen.idSensor
inner join colmeia as c
on sen.fkColmeia = c.idColmeia
inner join setor as st
on c.fkSetor = st.idSetor
inner join empresa as e
on st.fkEmpresa = e.idEmpresa
where idEmpresa = 1002;