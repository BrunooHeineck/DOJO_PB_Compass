const axios = require('axios');

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
