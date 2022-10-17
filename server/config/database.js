const { Pool } = require('pg');
require('dotenv/config');

//Base nuvem
const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,
});

async function connectionTest() {
	const response = await pool.query(
		"SELECT TO_CHAR(NOW(), 'dd-Mon-yyyy HH:MI:SS')"
	);

	console.log(
		`Connected to the ${process.env.DB_DATABASE} database => ${response.rows[0].to_char}`
	);
}

module.exports = { pool, connectionTest };
