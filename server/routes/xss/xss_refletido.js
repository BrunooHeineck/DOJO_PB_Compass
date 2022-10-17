const router = require('express').Router();
const { errHandling } = require('../../utils/utils');
const cookieParser = require('cookie-parser');
const { getUserByName } = require('../../service/service');

router.use(cookieParser());

const renderData = {};

router.get(
	'/xss_refletido',
	errHandling(async (req, res) => {
		const { nome } = req.query;
		renderData.hasUsers = 'false';
		renderData.busca = nome;
		if (nome != undefined) {
			const { rows } = await getUserByName(nome);

			if (rows[0]) renderData.hasUsers = 'true';
			renderData.busca = nome;
			renderData.users = rows;
		}

		res.render('xss_refletido', renderData);
	})
);

module.exports = router;
