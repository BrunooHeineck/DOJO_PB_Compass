const { faker } = require('@faker-js/faker');

exports.fakeUser = () => {
	faker.setLocale('pt_BR');
	const nome = `${faker.name.firstName()}`;
	const sobrenome = faker.name.lastName();
	const username = faker.internet.userName(nome, sobrenome);
	const email = faker.internet.email(nome, sobrenome, 'compasso.com.br');
	const senha = faker.internet.password(12);
	const telefone = faker.phone.phoneNumber('+55###########');
	const titulo = faker.lorem.words(2);
	const pais = faker.address.country();

	const nomeCompleto = `${nome} ${sobrenome}`;

	const userDados = {
		nome: nomeCompleto,
		username: username,
		email: email,
		senha: senha,
		telefone: telefone,
		titulo: titulo,
		pais: pais,
	};

	return userDados;
};
