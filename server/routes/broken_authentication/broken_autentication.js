const router = require('express').Router();
const { errHandling } = require('../../utils/utils');
const cookieParser = require('cookie-parser');
const { updateUsername, getUserById } = require('../../service/service');

router.use(cookieParser());

const renderData = {};

router.get(
	'/broken_autentication',
	errHandling(async (req, res) => {
		const { user_id } = req.cookies;
		const usuarioNaoAutenticado = user_id == undefined;

		if (usuarioNaoAutenticado) {
			res.render('user-not-authenticated');
		} else {
			const { rows } = await getUserById(user_id);
			renderData.username = rows[0].username;
			renderData.user_id = user_id;
			res.render('broken_autentication', renderData);
		}
	})
);

router.get(
	'/broken_autentication/alterarusername',
	errHandling(async (req, res) => {
		//CRIA A VARIAVEI COM BASE NO QUE VEIO NA URL
		const { id: user_id, novo_username } = req.query;
		renderData.user_id = user_id;
		//BUSCA NO BANCO DE DADOS SE O USUARIO EXISTE
		const { rows } = await getUserById(user_id);
		const userExiste = rows.length == 1;
		if (userExiste) {
			const { rows } = await updateUsername(novo_username, user_id);
			renderData.username = rows[0].username;
			res.render('broken_autentication', renderData);
		} else {
			renderData.username = 'User_id_not_found';
			res.render('broken_autentication', renderData);
		}
	})
);

module.exports = router;
