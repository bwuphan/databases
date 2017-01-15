CREATE DATABASE chat;

USE chat;


CREATE TABLE users (
  id integer not null primary key auto_increment,
  username varchar(25)
);

CREATE TABLE rooms (
  id integer not null primary key auto_increment,
  roomname varchar(25)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id integer not null primary key auto_increment,
  message varchar(140),
  room_id integer not null,
  user_id integer not null,
  foreign key(room_id) references rooms(id),
  foreign key(user_id) references users(id)
);

/* Create otSWher tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

