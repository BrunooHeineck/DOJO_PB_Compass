const router = require('express').Router();
const { criarUsuario, criarNota } = require('../../data/data_utils');
const { fakeUser } = require('./fake');

router.get('/aux/fake/createUser', async (req, res) => {
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
	res.json(rows);
});

module.exports = router;
