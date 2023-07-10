const { Pool } = require('pg');
require('dotenv/config');

//Base nuvem
// CRIA CONEXÃO COM O BANCO DE DADOS
const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,
});


module.exports = { pool };
