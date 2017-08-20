const path = require('path');
const express = require('express');
const request = require('request');

const viewPath = path.resolve(global.ROOT_DIR, './app/views/project-create.hbs');

const router = new express.Router();

router.post('/', (req, res) => {
	// console.log(req.body);

	var options = { method: 'POST',
		url: 'http://9.7.43.14:6026/setStatusproject',
		headers: {
			'content-type': 'application/json'
		},
		body: {
			title: 'Save the Plannet',
			idProject: '28',
			cost: '350.000.00',
			status: 'draft',
			description: 'This project is proposed to help the young society with the understanding of the world wide conflicts,so they can make better decisions in respect of the future of the world',
			valueTransfered: '0.0',
			amountCollected: '0.0',
			NGO: {
				idNgo: '10',
				NgoName: 'International Central of Education'
			},
			Prefecture:
			{
				idPrefecture: '2',
				prefectureName: 'Prefecture of Pernambuco'
			},
			StatusHistory: [ 'draft' ],
			donationsHistory:
			[
				{
					IdDonation: 7,
					value: 200,
					donator: {
						idDonator: 3,
						donatorName: 'gugu',
						typedonator: 'instituicao comercial'
					}
				}
			]
		},
		json: true };

	request(options, function(error, response, body) {
		if (error) {
			throw new Error(error);
		}

		console.log(body);
	});

	res.status(200)
		.send({error: false, data: []});
});

router.get('/', (req, res) => {
	if (req.session.userData.type === 'nog') {
		let templateData = {
			'userData': req.session.userData
		};
		res.render(viewPath, templateData);
	}
	else {
		res.redirect('/');
	}
});

module.exports = router;
