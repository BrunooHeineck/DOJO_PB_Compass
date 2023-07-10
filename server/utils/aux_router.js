const { dropAll, createTables } = require('../data/data_utils');
const { createFakeUser } = require('./utils');
const router = require('express').Router();

router.get('/aux/createUser', async (req, res) => {
	const rows = await createFakeUser()

	res.json(rows);
});

router.get('/aux/reset', async (req, res) => {
	await dropAll()
	await createTables()
	await createFakeUser()

	res.redirect('/');
});

module.exports = router
