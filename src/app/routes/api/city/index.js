
const express = require('express');

const router = new express.Router();

// FAKE STUFF
const cities = {
	'RJ': [
		{
			title: 'Rio de Janeiro',
			value: 'rio-de-janeiro'
		}
	],
	'SP': [
		{
			title: 'Campinas',
			value: 'campinas'
		},
		{
			title: 'Hortolândia',
			value: 'hortolandia'
		},
		{
			title: 'São Paulo',
			value: 'sao-paulo'
		}
	]

};

router.get('/:id', (req, res) => {
	const id = req.params.id;

	res.status(200)
		.send({error: false, data: cities[id]});
});

module.exports = router;
