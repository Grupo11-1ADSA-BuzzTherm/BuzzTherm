insert into buzztherm.empresa values (null, 'MelDourado LTDA.', 'MelDourado', '12345678000190', 'meldourado@gmail.com', '1134567890', 'anual', null);

insert into buzztherm.endereco_empresa values ((select idEmpresa from empresa where cnpj = '12345678000190'), 'Rua das Palmeiras', '11025100', '456', 'Consolação', 'SP', 'Santos');

insert into buzztherm.setor values (null, 'Fazenda MelDourado', (select idEmpresa from empresa where cnpj = '12345678000190'));

insert into buzztherm.funcionario values (null, 'MelDourado', 'meldourado@gmail.com', '123#Asd', 1, (select idEmpresa from empresa where cnpj = '12345678000190'));

insert into buzztherm.colmeia values (1, 'Colmeia A', 10, 'langstroth', 1, 1);
insert into buzztherm.colmeia values (2, 'Colmeia B', 10, 'langstroth', 1, 1);
insert into buzztherm.colmeia values (3, 'Colmeia C', 10, 'langstroth', 1, 1);
insert into buzztherm.colmeia values (4, 'Colmeia D', 10, 'langstroth', 1, 1);
insert into buzztherm.colmeia values (5, 'Colmeia E', 10, 'langstroth', 1, 1);

insert into buzztherm.registro (temp, umid, fkcolmeia) values
    (33.0, 55.0, 1),
    (33.5, 58.0, 1),
    (32.8, 60.0, 1),
    (32.5, 59.5, 1),
    (34.0, 57.0, 1);

insert into buzztherm.registro (temp, umid, fkcolmeia) values
    (33.2, 53.0, 2),
    (34.0, 54.5, 2),
    (32.8, 56.0, 2),
    (33.5, 53.7, 2),
    (34.3, 59.0, 2);

insert into buzztherm.registro (temp, umid, fkcolmeia) values
    (32.5, 59.0, 3),
    (33.0, 60.5, 3),
    (32.3, 61.0, 3),
    (32.7, 59.7, 3),
    (33.8, 58.3, 3);

insert into buzztherm.registro (temp, umid, fkcolmeia) values
    (33.7, 58.0, 4),
    (34.0, 56.5, 4),
    (33.0, 59.2, 4),
    (33.2, 57.7, 4),
    (34.0, 55.0, 4);

insert into buzztherm.registro (temp, umid, fkcolmeia) values
    (32.5, 63.0, 5),
    (33.0, 62.0, 5),
    (32.3, 64.0, 5),
    (32.7, 62.7, 5),
    (33.8, 60.0, 5);