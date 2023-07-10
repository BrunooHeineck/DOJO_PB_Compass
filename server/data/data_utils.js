const dataBase = require('../config/connection').pool;

exports.excluirAllUsers = async () => {
	return await dataBase.query('DELETE FROM user_data');
};

exports.dropAll = async () => {
	await dataBase.query(`
	DROP TABLE user_notas;
	DROP TABLE user_data;
	`);
}

exports.createTables = async () => {
	await dataBase.query(`	
	CREATE TABLE IF NOT EXISTS user_data (
		id_user serial4 NOT NULL,
		nome varchar(100) NOT NULL,
		username varchar(100) NOT NULL,
		email varchar(100) NOT NULL,
		senha varchar(100) NOT NULL,
		telefone varchar(14) NOT NULL,
		CONSTRAINT user_data_pkey PRIMARY KEY (id_user)
	);
	
	CREATE TABLE IF NOT EXISTS user_notas (
		id_nota serial4 NOT NULL,
		titulo varchar(100) NOT NULL,
		pais varchar(100) NOT NULL,
		id_user int4 NOT NULL,
		CONSTRAINT user_notas_pkey PRIMARY KEY (id_nota),
		CONSTRAINT user_notas_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.user_data(id_user)
	);`)

	const selectAll = await dataBase.query(`
	SELECT * FROM user_data;
	`)
	return selectAll.rows.length > 0
}

exports.criarUsuario = async user_data => {
	const { nome, username, email, senha, telefone } = user_data;

	return await dataBase.query(
		`
		INSERT INTO user_data 
			(nome,
			username,
			email,
			senha,
			telefone) 
		values 
			('${nome}',
			'${username}',
			'${email}',
			'${senha}',
			'${telefone}'
			)
		RETURNING id_user
    `
	);
};

exports.criarNota = async user_data => {
	const { titulo, pais, user_id } = user_data;

	return await dataBase.query(
		`
		INSERT INTO user_notas 
			(
			titulo,
			pais,
			id_user
			) 
		values 
			('${titulo}',
			'${pais}',
			'${user_id}'
			)
		RETURNING id_nota
    `
	);
};
