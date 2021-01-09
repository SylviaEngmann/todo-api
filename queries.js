const Pool = require('pg').Pool
/*
const pool = new Pool({
  user: 'fialgzgsajjpit',
  host: 'ec2-54-170-123-247.eu-west-1.compute.amazonaws.com',
  database: 'd6t1ba3hcih0fh',
  password: '0c1936283bbef6d61ddfb1177fdb578e2d7f56e1d35cf4053fb8c28b35368662',
  port: 5432,
})
*/

const pool = new Pool({
    user: 'engineer',
    host: 'localhost',
    database: 'todoapi',
    password: 't0d0u53r!',
    port: 5432,
})

const getTodo = (request, response) => {
    pool.query('SELECT * FROM todo_list', (error, results) =>{
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTodoById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM todo_list WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addTodo = (request, response) => {
    const {taskName, taskDescription, dueDate, taskStatus, taskPriority} = request.body
    pool.query('INSERT INTO todo_list (taskName, taskDescription, dueDate, taskStatus, taskPriority) VALUES ($1, $2, $3, $4, $5)', [taskName, taskDescription, dueDate, taskStatus, taskPriority], (error, results) => {
        if (error) {
            throw error
          }
          response.status(201).send(`Task Item added with ID: ${result.insertId}`)
    })
}

const editTodo = (request, response) => {
    const id = parseInt(request.params.id)
    const {taskName, taskDescription, dueDate, taskStatus, taskPriority} = request.body

    pool.query('UPDATE todo_list set taskName = $1, taskDescription = $2, dueDate = $3, taskStatus = $4, taskPriority = $5', [taskName, taskDescription, dueDate, taskStatus, taskPriority], (error, results) => {
        if (error) {
            throw error
          }
          response.status(201).send(`Task Item edited with ID: ${id}`)
    })
}

const deleteTodo = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE from todo_list WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Task Item deleted with ID: ${id}`)
    })
}

module.exports = {
    getTodo,
    getTodoById,
    addTodo,
}