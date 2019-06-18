drop database if exists sniffer_db;
create database sniffer_db;
use sniffer_db;

create table dogs(
id int(11) auto_increment not null,
name varchar(255) not null,
ownerId int(11) not null,
breed varchar(255) not null,
event int(11),
primary key(id)
);

create table events(
id int(11) auto_increment not null,
name varchar(255) not null,
location varchar(255) not null,
date DATETIME not null,
primary key(id)
);

create table owners(
id int(11) auto_increment not null,
username varchar(255) not null,
name varchar(255),
phone int(11),
email varchar(255),
password varchar(255),
primary key(id)
)


