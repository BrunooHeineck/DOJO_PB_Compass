const dataBase = require('../config/database').pool;

exports.excluirAllUsers = async () => {
	return await dataBase.query('DELETE FROM user_data');
};

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
