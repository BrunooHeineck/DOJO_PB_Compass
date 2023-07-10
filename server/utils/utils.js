const axios = require('axios');
const { criarUsuario, criarNota } = require('../data/data_utils');
const { fakeUser } = require('./fake/fake');

exports.errHandling = fn => (req, res, next) =>
	Promise.resolve(fn(req, res, next)).catch(next);

exports.request = async (endPoint, method, data) => {
	const porta = process.env.PORT || 3000;
	const URL_PADRAO = 'http://localhost:' + porta;
	const url = `${URL_PADRAO}${endPoint}`;

	const { headers, data: res } = await axios({
		url,
		method,
		data,
		validateStatus: false,
	});

	return { headers, res };
};

exports.getVulnType = () => {
	const vulnType = [
		{ titulo: 'CSRF-GET', link: 'csrf-get' },
		{ titulo: 'CSRF-POST', link: 'csrf-post' },
		{ titulo: 'SQLI', link: 'sqli' },
		{ titulo: 'XSS Refletido', link: 'xss_refletido' },
		{ titulo: 'XSS Armazenado', link: 'xss_armazenado' },
		{ titulo: 'Broken Authentication', link: 'broken_authentication' },
		{ titulo: 'Broken Authentication II', link: 'broken_authentication_II' },
		{ titulo: 'Broken Authentication III', link: 'broken_authentication_III' },
	];

	return vulnType
}

exports.createFakeUser = async () => {
	userData = fakeUser();
	const { rows } = await criarUsuario(userData);
	userData.user_id = rows[0].id_user;
	var repeat = Math.floor(Math.random() * 4);

	if (repeat < 1) {
		repeat = 1;
	}

	for (var i = 0; i < repeat; i++) {
		userData = fakeUser();
		userData.user_id = rows[0].id_user;
		await criarNota(userData);
	}

	return rows[0]
};
