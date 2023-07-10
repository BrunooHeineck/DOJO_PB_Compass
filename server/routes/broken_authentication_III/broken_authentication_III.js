const router = require('express').Router();
const { errHandling } = require('../../utils/utils');
const cookieParser = require('cookie-parser');
const { query } = require('express');
const { getNotasByUserId } = require('../../service/service');

router.use(cookieParser());

const renderData = {};

router.get(
	'/broken_authentication_III',
	errHandling(async (req, res) => {
		const { user_id } = req.cookies;
		const usuarioNaoAutenticado = user_id == undefined;

		if (usuarioNaoAutenticado) {
			res.redirect('/user-not-authenticated');
		} else {
			res.redirect(`broken_authentication_III/notas/${user_id}`);
		}
	})
);

router.get(
	'/broken_authentication_III/notas/*',
	errHandling(async (req, res) => {
		const user_id = req.originalUrl.split('/')[3];

		if (!isNaN(parseInt(user_id))) {
			const { rows } = await getNotasByUserId(user_id);
			renderData.posts = rows;
			res.render('broken_authentication_III', renderData);
		} else {
			res.redirect('/user-not-authenticated');
		}
	})
);

module.exports = router;
