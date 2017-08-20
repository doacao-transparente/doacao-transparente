const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
	req.session.userData = undefined;
	res.redirect('/');
});

module.exports = router;
