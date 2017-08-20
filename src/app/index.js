const path = require('path');
const http = require('http');
const express = require('express');
const hbs = require('hbs');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const session = require('express-session');

const distPath = path.resolve(global.ROOT_DIR, './app/public');
const routerPath = path.resolve(global.ROOT_DIR, './app/routes');
const partialsPath = path.resolve(global.ROOT_DIR, './app/views');

const getServer = () => {
	// Server
	const app = express();
	const server = http.createServer(app);
	const port = process.env.PORT || 9993;

	app.set('port', port);
	app.use(helmet());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(session({
		secret: '7he_gr3@T3st-s3ss10n-p@sS',
		resave: false,
		saveUninitialized: true,
		cookie: {
			//   secure: true,
			path: '/'
		}
	}));

	app.set('view engine', 'hbs');
	app.engine('hbs', hbs.__express);
	hbs.registerPartials(partialsPath);
	hbs.registerHelper('compare', function($item1, $item2) {
		if ($item1 === $item2) {
			return true;
		}
		else {
			return false;
		}
	});

	// Static files
	app.use('/', express.static(distPath, {
		// Cache for static files lasts a day (defined in seconds)
		// maxAge: 24 * 60 * 60
	}));

	// Routing
	const router = require(routerPath);
	app.use(router);

	return {server, port};
};

module.exports = getServer;
