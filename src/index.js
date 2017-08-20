global.ROOT_DIR = __dirname;

const path = require('path');
const serverPath = path.resolve(global.ROOT_DIR, './app');

const getServer = require(serverPath);
const {server, port} = getServer();

server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
