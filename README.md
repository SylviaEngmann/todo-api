# todo-api

API for my todo list

Clone the repository and navigate into the folder. Run npm install to install dependencies, and node app.js to run the server. This runs on port 3600.
This is dependent on Postgres, and below are the commands for setting up the tables in the database:

CREATE DATABASE todoapi;
CREATE ROLE todo-api-user WITH LOGIN PASSWORD 't0d0u53r';
CREATE ROLE engineer  WITH LOGIN PASSWORD 't0d0u53r';

CREATE TYPE task_status_types as enum('in_progress', 'completed'); 
CREATE TYPE task_priority_types as enum('1', '2', '3');

CREATE TABLE todo_list ( ID SERIAL PRIMARY KEY,  taskName VARCHAR(30),  taskDescription TEXT, dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  dueDate DATE, taskStatus task_status_types, taskPriority task_priority_types);

GRANT CONNECT ON DATABASE api TO engineer;
GRANT CONNECT ON DATABASE todoapi TO engineer;
