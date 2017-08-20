function requireJson($path) {
	let answer = {};

	try {
		delete require.cache[require.resolve($path)];
	}
	catch (err) {
		console.log(err);
	}

	try {
		answer = require($path);
	}
	catch (err) {
		console.log(err);
	}

	return answer;
}
