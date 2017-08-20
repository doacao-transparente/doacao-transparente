const path = require('path');
const express = require('express');

const viewPath = path.resolve(global.ROOT_DIR, './app/views/project-view.hbs');

const projectsMockup = require('./mockup.json');

const router = new express.Router();

router.post('/', (req, res) => {
	// res.sendFile(viewPath);
});

router.get('/', (req, res) => {
	let filteredProjects = projectsMockup;

	if (req.session.userData) {
		// filteredProjects = projectsMockup.filter((value) => {
		// 	if (value.status === 'approved') {
		// 		return value;
		// 	}
		// });
	}
	else {
		filteredProjects = projectsMockup.filter((value) => {
			if (value.status === 'approved') {
				return value;
			}
		});
	}

	res.status(200)
		.send({error: false, data: filteredProjects});
});

router.get('/:id', (req, res) => {
	let project = projectsMockup.filter((val) => {
		if (val.id === req.params.id) {
			return val;
		}
	});

	if (project.length > 0) {
		project = project[0];
		project.backersTitle = project.backers > 1 ? 'Doadores' : 'Doador';
		project.backedPercent = Math.ceil(project.collected / (project.pledged / 100));
	}

	let templateData = {
		'userData': req.session.userData || signoOnMockUp,
		'project': project
	};
	res.render(viewPath, templateData);
});

module.exports = router;
