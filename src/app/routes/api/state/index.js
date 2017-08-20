
const express = require('express');

const router = new express.Router();

// FAKE STUFF
const states = [
	{
		title: 'Rio de Janeiro',
		value: 'RJ'
	},
	{
		title: 'São Paulo',
		value: 'SP'
	}
];

router.get('/', (req, res) => {
	res.status(200)
		.send({error: false, data: states});
});

module.exports = router;
