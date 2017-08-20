const path = require('path');

const viewPath = path.resolve(global.ROOT_DIR, './app/views/index.hbs');

module.exports = function(req, res) {
	let templateData = {
		'userData': req.session.userData
	};
	res.render(viewPath, templateData);
};
