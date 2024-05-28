create schema dtb_estaciona_mais;

use dtb_estaciona_mais;

##Tabela de Cargos
create table tbl_cargo(
id integer not null primary key auto_increment,
cargo varchar(50) not null
);
insert into tbl_cargo(cargo)values
('Chefe Geral'),
('Gerente'),
('Operador'),
('Manobrista');



##Tabela de Funcionários
create table tbl_funcionarios(
id integer not null primary key auto_increment,
nome varchar(80) not null,
data_nascimento date not null,
email varchar(100) not null,
senha varchar(20) not null,

##FK CARGO FUNCIONARIOS
id_cargo integer not null,
constraint FK_CARGO_FUNCIONARIOS
foreign key (id_cargo) references tbl_cargo(id)
);
insert into tbl_funcionarios(nome, data_nascimento, email, senha, id_cargo)
values
(
'Vitor Kolle',
'2000-05-07',
'vitor@estacionamais.com',
'123456',
1
);



##Tabela de Marcas
create table tbl_marcas(
id integer not null primary key auto_increment,
marca varchar(20) not null
);
insert into tbl_marcas(marca)values
('Volkswagen');



##Tabela de Cores
create table tbl_cores(
id integer not null primary key auto_increment,
cor varchar(20) not null
);
insert into tbl_cores(cor)values
('Vermelho');



##Tabela de Tipos de Veículos
create table tbl_tipo_veiculo(
id integer not null primary key auto_increment,
tipo_veiculo varchar(20) not null
);
insert into tbl_tipo_veiculo(tipo_veiculo)values
('Carro');



##Tabela de Veículos
create table tbl_veiculo(
id integer not null primary key auto_increment,
placa varchar(8) not null,
modelo varchar(30) not null,

##FK MARCAS VEICULO
id_marca integer not null,
constraint FK_MARCAS_VEICULO
foreign key(id_marca) references tbl_marcas(id),

##FK CORES VEICULO
id_cor integer not null,
constraint FK_CORES_VEICULO
foreign key(id_cor) references tbl_cores(id),

##FK TIPO_VEICULO VEICULO
id_tipo_veiculo integer not null,
constraint FK_TIPO_VEICULO_VEICULO
foreign key(id_tipo_veiculo) references tbl_tipo_veiculo(id)
);
insert into tbl_veiculo(placa, modelo, id_marca, id_cor, id_tipo_veiculo)values
(
'aaa-1234',
'Jetta',
1,
1,
1
);



##Tabela de endereço do cliente
create table tbl_endereco_cliente(
id integer not null primary key auto_increment,
logradouro varchar(100) not null,
bairro varchar(50) not null,
cidade varchar(100) not null,
estado varchar(40) not null,
pais varchar(40) not null
);
insert into tbl_endereco_cliente(logradouro, bairro, cidade, estado, pais)values
(
'Rua abc 12',
'Bairro 15',
'Jandira',
'São Paulo',
'Brasil'
);



##Tabela de Clientes
create table tbl_clientes(
id integer not null primary key auto_increment,
nome varchar(80) not null,
data_nascimento date not null,
cpf varchar(14) not null,
email varchar(100) not null,
senha varchar(20) not null,
telefone varchar(15) not null,

##FK ENDERECO_CLIENTE CLIENTE
id_endereco_cliente integer not null,
constraint FK_ENDERECO_CLIENTE_CLIENTE
foreign key(id_endereco_cliente) references tbl_endereco_cliente(id)
);
insert into tbl_clientes(nome, data_nascimento, cpf, email, senha, telefone, id_endereco_cliente)values
(
'Gabriel',
'1990-10-21',
'123.456.789-00',
'gabriel@gmail.com',
'123456',
'1198765-1456',
1
);



##Tabela de Clientes e Veículos
create table tbl_clientes_veiculo(
id integer not null primary key auto_increment,

## FK CLIENTES CLIENTES_VEICULO
id_cliente integer not null,
constraint FK_CLIENTES_CLIENTES_VEICULO
foreign key(id_cliente) references tbl_clientes(id),

## FK VEICULOS CLIENTES_VEICULO
id_veiculo integer not null,
constraint FK_VEICULOS_CLIENTES_VEICULO
foreign key(id_veiculo) references tbl_veiculo(id)
);
insert into tbl_clientes_veiculo(id_cliente, id_veiculo)values
(1, 1);



##Tabela de Clientes e Forma de Pagamento
create table tbl_cliente_forma_pagamento(
id integer not null primary key auto_increment,

##FK_CLIENTES_CLIENTES_FORMA_PAGAMENTO
id_cliente integer not null,
constraint FK_CLIENTES_CLIENTES_FORMA_PAGAMENTO
foreign key(id_cliente) references tbl_clientes(id),


##FK_FORMA_PAGAMENTO_CLIENTES_FORMA_PAGAMENTO
id_forma_pagamento integer not null,
constraint FK_FORMA_PAGAMENTO_CLIENTES_FORMA_PAGAMENTO
foreign key(id_forma_pagamento) references tbl_forma_pagamento(id)
);

##Tabela de Formas de Pagamento
create table tbl_forma_pagamento(
id integer not null primary key auto_increment,
forma_pagamento varchar(20) not null,
nome_cartao varchar(30),
numero_cartao varchar(19),
data_vencimento date,
cvc varchar(4),
codigo_pix varchar(300)
);
insert into tbl_forma_pagamento(forma_pagamento, nome_cartao, numero_cartao, data_vencimento, cvc, codigo_pix)values
(
'Cartão de Crédito',
'Vitor P Kolle',
'1234 5678 0123',
'2025-02-01',
'222',
null
);



##Tabela de Pagamentos
create table tbl_pagamentos(
id integer not null primary key auto_increment,
valor float not null,
data_pagamento datetime not null,

##FK FORMA PAGAMENTO PAGAMENTOS
id_forma_pagamento integer not null,
constraint FK_FORMA_PAGAMENTO_PAGAMENTOS
foreign key(id_forma_pagamento) references tbl_forma_pagamento(id)
);

alter table tbl_pagamentos
add column pago boolean not null;

insert into tbl_pagamentos(valor, data_pagamento, id_forma_pagamento, pago)values
(
15.00,
'2019-10-20 12:34:21',
1,
true
);


##Tabela de Endereço do emitente
create table tbl_endereco_emitente(
id integer not null primary key auto_increment,
logradouro varchar(100) not null,
bairro varchar(50) not null,
cidade varchar(100) not null,
estado varchar(40) not null,
pais varchar(40) not null
);
insert into tbl_endereco_emitente(logradouro, bairro, cidade, estado, pais)values
(
'Rua abc 12',
'Bairro 15',
'Jandira',
'São Paulo',
'Brasil'
);



##Tabela de Recibo
create table tbl_recibo(
id integer not null primary key auto_increment,
valor float not null,
nome_pagante varchar(80) not null,
nome_emitente varchar(20) not null,
cnpj_emitente varchar(18) not null,

## FK PAGAMENTOS RECIBO
id_pagamentos integer not null,
constraint FK_PAGAMENTOS_RECIBO
foreign key(id_pagamentos) references tbl_pagamentos(id),

## FK ENDERECO EMITENTE RECIBO
id_endereco_emitente integer not null,
constraint FK_ENDERECO_EMITENTE_RECIBO
foreign key(id_endereco_emitente) references tbl_endereco_emitente(id)
);

start transaction;
insert into tbl_recibo(valor, nome_pagante, nome_emitente, cnpj_emitente, id_pagamentos, id_endereco_emitente)values
(
0.00,
'Kolle',
'Estaciona Mais',
'11.111.111/1111-11',
1,
1
);

set @ultimo_id = last_insert_id();

update tbl_recibo
			set
            valor = 10.00
            where id = @ultimo_id;
commit;
select * from tbl_recibo;




##Tabela de Disponibilidade
create table tbl_disponibilidade(
id integer not null primary key auto_increment,
disponibilidade boolean not null
);
insert into tbl_disponibilidade(disponibilidade)values
(true),
(false);

select * from tbl_disponibilidade;



##Tabela de Cobertura
create table tbl_cobertura(
id integer not null primary key auto_increment,
cobertura boolean not null
);
insert into tbl_cobertura(cobertura)values
(true),
(false);

select * from tbl_cobertura;



##Tabela de Categoria de Vagas
create table tbl_categoria_vagas(
id integer not null primary key auto_increment,
categoria_vaga varchar(45) not null
);
insert into tbl_categoria_vagas(categoria_vaga)values
('Carro'),
('Moto');

select * from tbl_categoria_vagas;



##Tabela de Vagas
create table tbl_vagas(
id integer not null primary key auto_increment,
codigo_vaga varchar(20) not null,
piso integer not null,


##FK CATEGORIA VAGAS VAGAS
id_categoria_vagas integer not null,
constraint FK_CATEGORIA_VAGAS_VAGAS
foreign key(id_categoria_vagas) references tbl_categoria_vagas(id),


##FK DISPONIBILIDADE VAGAS
id_disponibilidade integer not null,
constraint FK_DISPONIBILIDADE_VAGAS
foreign key(id_disponibilidade) references tbl_disponibilidade(id),


##FK COBERTURA VAGAS
id_cobertura integer not null,
constraint FK_COBERTURA_VAGAS
foreign key(id_disponibilidade) references tbl_cobertura(id)
);
insert into tbl_vagas(codigo_vaga, piso, id_categoria_vagas, id_disponibilidade, id_cobertura)values
(
'AAAA1',
1,
1,
1,
1
);

select * from tbl_vagas;



##Tabela de Reservas
create table tbl_reservas(
id integer not null primary key auto_increment,
entrada datetime not null,
saida datetime not null,


##FK VAGA RESERVA
id_vaga integer not null,
constraint FK_VAGA_RESERVAS
foreign key(id_vaga) references tbl_vagas(id),


##FK PAGAMENTO RESERVA
id_pagamento integer not null,
constraint FK_PAGAMENTO_RESERVAS
foreign key(id_pagamento) references tbl_pagamentos(id),


##FK CLIENTES RESERVAS
id_cliente integer not null,
constraint FK_CLIENTE_RESERVAS
foreign key(id_cliente) references tbl_clientes(id)
);
insert into tbl_reservas(entrada, saida, id_vaga, id_pagamento, id_cliente)values
(
'2024-05-21 10:58:01',
'2024-005-21 12:34:21',
1,
1,
1
);

select * from tbl_reservas;











