const path = require('path');
const credentialsPath = path.resolve(path.resolve(global.ROOT_DIR, '../credentials/user.json'));

module.exports = (req, res, next) => {
	let loginCredentials;

	try {
		loginCredentials = require(credentialsPath);
	}
	catch (err) {}

	if ((!req.session.userData) && (loginCredentials) && (loginCredentials.id) && (loginCredentials.id !== '')) {
		req.session.userData = loginCredentials;
	}
	next();
};
