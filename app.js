const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const app = express()

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
const port = 3600
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Todo List API' })
  })
app.get('/todolist', db.getTodo)
app.get('/todolist/:id', db.getTodoById)
app.post('/todolist', db.addTodo)
app.put('/todolist/:id', db.editTodo)
app.delete('/todolist/:id', db.deleteTodo)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })