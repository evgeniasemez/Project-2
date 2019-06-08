DROP DATABASE IF EXISTS sniffer_db;
-- Create a database called programming_db --
CREATE DATABASE sniffer_db;
use sniffer_db;
CREATE TABLE signInTable(
id int NOT NULL AUTO_INCREMENT,
name varchar(50),
password varchar(50),
PRIMARY KEY (id)
);