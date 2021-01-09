const Pool = require('pg').Pool

const pool = new Pool({
    user: 'engineer',
    host: 'localhost',
    database: 'todoapi',
    password: 't0d0u53r!',
    port: 5432,
})

module.exports = {
    pool,
}