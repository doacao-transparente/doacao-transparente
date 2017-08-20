const path = require('path');
const express = require('express');

const viewPath = path.resolve(global.ROOT_DIR, './app/views/login.hbs');

const mockup = require('./mockup.json');

const router = new express.Router();

router.post('/', (req, res) => {
	let email = req.body.email;

	// TODO Make this real, preferably with object storage
	if (mockup[email]) {
		req.session.userData = mockup[email];
		res.status(200)
			.send({error: false, data: []});
	}
	else {
		res.status(200)
			.send({error: true, data: []});
	}
});

router.get('/', (req, res) => {
	res.render(viewPath);
});

module.exports = router;
