const Pool = require('pg').Pool

const pool = new Pool({
    user: 'engineer',
    host: 'localhost',
    database: 'todoapi',
    password: 't0d0u53r!',
    port: 5432,
})

//works
const getTodo = (request, response) => {
    pool.query('SELECT * FROM todo_list', (error, results) =>{
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    })
}

//works
const getTodoById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM todo_list WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addTodo = (request, response) => {
    //console.log(request.body);
    const taskname = request.body.taskname;
    const taskdescription = request.body.taskdescription;
    const duedate = request.body.duedate;
    const taskstatus = request.body.taskstatus;
    const taskpriority = request.body.taskpriority;

    pool.query(
        'INSERT INTO todo_list (taskName, taskDescription, dueDate, taskStatus, taskPriority) VALUES ($1, $2, $3, $4, $5)',
        [taskname, taskdescription, duedate, taskstatus, taskpriority],
     (error, results) => {
        if (error) {
            throw error
          }
          response.status(201).json({'message' : 'Todo inserted successfully'})
    })
}

const editTodo = (request, response) => {
    const id = parseInt(request.params.id)
    const {taskName, taskDescription, dueDate, taskStatus, taskPriority} = request.body

    pool.query('UPDATE todo_list set taskName = $1, taskDescription = $2, dueDate = $3, taskStatus = $4, taskPriority = $5', [taskName, taskDescription, dueDate, taskStatus, taskPriority], (error, results) => {
        if (error) {
            throw error
          }
          //response.status(201).send(`Task Item edited with ID: ${id}`)
          response.status(201).json({'message' : 'Task Item edited'})
    })
}

//works
const deleteTodo = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE from todo_list WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        //response.status(200).send(`Task Item deleted with ID: ${id}`)
        response.status(200).json({'message' : 'Task Item deleted'})

    })
}

module.exports = {
    getTodo,
    getTodoById,
    addTodo,
    editTodo,
    deleteTodo,
}