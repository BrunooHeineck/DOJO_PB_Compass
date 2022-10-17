const router = require('express').Router();
const { errHandling } = require('../../utils/utils');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

const renderData = {};

//RENDERIZA A PÁGINA /csrf-post
// router.get(
// 	'/csrf-post',
// 	errHandling(async (req, res) => {
// 		const { user_id } = req.cookies;
// 		const { rows } = await getEmail(user_id);

// 		if (user_id == undefined) {
// 			res.render('user-not-authenticated');
// 		} else {
// 			if (!rows) {
// 				renderData.email = 'null';
// 			} else renderData.email = rows[0].email;
// 			res.render('csrf-post', renderData);
// 		}
// 	})
// );

//RENDERIZA A PÁGINA /csrf-post/token
// router.get(
// 	'/csrf-post/token',
// 	errHandling(async (req, res) => {
// 		const { rows } = await getEmail();
// 		const { user_id } = req.cookies;

// 		const { rows: rows_token } = await getToken();
// 		const token = rows_token[0].token_csrf;
// 		renderData.token_csrf = token;

// 		if (user_id == undefined) {
// 			res.render('user-not-authenticated');
// 		} else {
// 			renderData.email = rows[0].email;
// 			res.render('csrf-post-token', renderData);
// 		}
// 	})
// );

module.exports = router;
