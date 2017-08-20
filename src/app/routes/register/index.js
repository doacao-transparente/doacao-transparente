const path = require('path');
const express = require('express');

const router = new express.Router();

const viewPath = path.resolve(global.ROOT_DIR, './app/views/register-user.hbs');

router.get('/', (req, res) => {
	res.render(viewPath);
});

module.exports = router;
