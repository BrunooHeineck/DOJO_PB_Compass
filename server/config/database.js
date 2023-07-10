const { pool } = require('./connection');
require('dotenv/config');

exports.connectionTest = async () => {
	const response = await pool.query(
		"SELECT TO_CHAR(NOW(), 'dd-Mon-yyyy HH:MI:SS')"
	);

	console.log(
		`Connected to the ${process.env.DB_DATABASE} database => ${response.rows[0].to_char}`
	);

}

