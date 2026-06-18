create database if not exists bodega;
use bodega;

create table categoria(
	id int primary key auto_increment,
    nombre varchar(25) not null
);

create table usuario(
	id int primary key auto_increment,
    nombre varchar(40) not null,
    email varchar(50) not null unique,
    contraseña varchar(30) not null,
    rol varchar(10) not null
);

create table vino(
	id int primary key auto_increment,
    nombre varchar(30) not null,
    categoria_id int not null,
    bodega varchar(40) not null,
    año_cosecha int not null,
    precio decimal(10,2),
    stock int not null,
    descripcion text not null,
    foreign key (categoria_id) references categoria (id)
);

create table pedido(
	id int primary key auto_increment,
    usuario_id int not null,
    fecha datetime not null,
    total decimal(10,2),
    foreign key (usuario_id) references usuario (id)
);

create table detalle_pedido(
	id int primary key auto_increment,
    pedido_id int not null, #FK
    vino_id int not null, #FK
    cantidad int not null,
    precio_unitario decimal(10,2),
    foreign key (pedido_id) references pedido (id),
    foreign key (vino_id) references vino (id)
)