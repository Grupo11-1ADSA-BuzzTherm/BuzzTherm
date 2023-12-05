insert into buzztherm.empresa values (null, 'MelDourado LTDA.', 'MelDourado', '12345678000190', 'meldourado@gmail.com', '1134567890', 'anual', null);

insert into buzztherm.endereco_empresa values ((select idEmpresa from empresa where cnpj = '12345678000190'), 'Rua das Palmeiras', '11025100', '456', 'Consolação', 'SP', 'Santos');

insert into buzztherm.setor values (null, 'Fazenda MelDourado', (select idEmpresa from empresa where cnpj = '12345678000190'));

insert into buzztherm.funcionario values (null, 'MelDourado', 'meldourado@gmail.com', '123#Asd', 1, (select idEmpresa from empresa where cnpj = '12345678000190'));

insert into buzztherm.colmeia values (1, 'colmeia1', 10, 'tipo', 1, 1);
insert into buzztherm.colmeia values (2, 'colmeia2', 10, 'tipo', 1, 1);
insert into buzztherm.colmeia values (3, 'colmeia3', 10, 'tipo', 1, 1);
insert into buzztherm.colmeia values (4, 'colmeia4', 10, 'tipo', 1, 1);
insert into buzztherm.colmeia values (5, 'colmeia5', 10, 'tipo', 1, 1);

select * from buzztherm.registro;