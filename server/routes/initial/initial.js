const router = require('express').Router();
const { errHandling, getVulnType } = require('../../utils/utils');
const cookieParser = require('cookie-parser');
const { getUserById } = require('../../service/service');
router.use(cookieParser());

const renderData = {};


//RENDERIZA A PÁGINA inicial
router.get(
	'/',
	errHandling(async (req, res) => {
		const { user_id } = req.cookies;
		const usuarioAutenticado = user_id != undefined;
		vulnType = getVulnType()
		renderData.vulnType = vulnType;

		if (usuarioAutenticado) {
			renderData.hasUsers = 'true';
		} else {
			renderData.hasUsers = 'false';
		}
		res.render('initial_page', renderData);
	})
);

// const cookies = { sameSite: 'none', secure: false, httpOnly: false };
const cookies = { sameSite: 'none', secure: true, httpOnly: false };
// const cookies = { sameSite: 'strict', secure: false, httpOnly: false };
// const cookies = { sameSite: 'strict', secure: true, httpOnly: true };
// const cookies = { sameSite: 'lax', secure: false, httpOnly: false };

//REALIZA O LOGIN - SET COOKIES
router.get(
	'/login',
	errHandling(async (req, res) => {
		const user_id = 1;
		const { rows } = await getUserById(user_id);
		renderData.username = rows[0].username;
		vulnType = getVulnType()
		renderData.vulnType = vulnType;
		renderData.hasUsers = 'true';
		res.cookie('user_id', user_id, cookies).render(
			'initial_page',
			renderData
		);
	})
);

//REALIZA O LOGOUT - CLEAR COOKIES
router.get(
	'/logout',
	errHandling(async (req, res) => {
		vulnType = getVulnType()
		renderData.vulnType = vulnType;
		renderData.hasUsers = 'false';
		res.clearCookie('user_id').render('initial_page', renderData);
	})
);

router.get(
	'/user-not-authenticated',
	errHandling(async (req, res) => {
		res.render('user-not-authenticated', renderData);
	})
);

module.exports = router;
