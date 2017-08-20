'use-strict';

let vueFormCreateProject;
let vueFormModal;

let page = {

	init: () => {
		vueFormCreateProject = new Vue({
			el: '#createProjectForm',
			data: {
				states: [],
				cities: []
			},
			created: () => {
				$.ajax({
					url: `/api/state/`,
					type: 'GET'
				})
					.then((response) => {
						if (!response.error) {
							vueFormCreateProject.states = response.data;
							vueFormCreateProject.loadCities(response.data[0].value);
						}
						else {
							console.warn(response);
						}
					})
					.catch((error) => {
						console.warn(error);
					});
			},
			methods: {
				save: (event) => {
					vueFormCreateProject.checkForm()
						.then((isValid) => {
							if (isValid) {
								vueFormCreateProject.performSave();
							}
							else {
								vueFormModal.showErrorInvalidForm();
								vueFormModal.show();
							}
						});
				},
				checkForm: () => {
					let targets = [
						'#projectName',
						'#state',
						'#cityHall',
						'#projectDescription',
						'#ammount',
						'#file'
					];
					targets = targets.filter((target) => {
						if ((!$(target).val()) || ($(target).val() === '')) {
							return target;
						}
					});

					let count = targets.length;

					if (count > 0) {
						return Promise.resolve(false);
					}
					else {
						return Promise.resolve(true);
					}
				},
				performSave: () => {
					$.ajax({
						url: '/project/create',
						type: 'POST',
						data: {
							'projectName': $('#projectName').val(),
							'projectDescription': $('#projectDescription').val(),
							'ammount': $('#ammount').val(),
							'cityHall': $('#cityHall').val(),
							'file': $('#file').val()
						}
					})
						.then((response) => {
							if (!response.error) {
								vueFormModal.showSuccess();
								vueFormModal.show();
							}
							else {
								vueFormModal.showErrorSave();
								vueFormModal.show();
							}
						})
						.catch((error) => {
							console.warn(error);
							vueFormModal.showErrorSave();
							vueFormModal.show();
						});
				},
				changeCity: (event) => {
					let value = $(event.target).val();
					vueFormCreateProject.loadCities(value);
				},
				loadCities: (city) => {
					$.ajax({
						url: `/api/city/${city}`,
						type: 'GET'
					})
						.then((response) => {
							if (!response.error) {
								vueFormCreateProject.cities = response.data;
								console.warn(vueFormCreateProject.cities);
							}
							else {
								console.warn(response);
							}
						})
						.catch((error) => {
							console.warn(error);
						});
				}
			}

		});

		vueFormModal = new Vue({
			el: '#answerModal',
			data: {
				error: false,
				status: '',
				message: ''
			},
			methods: {
				showErrorInvalidForm: () => {
					vueFormModal.status = 'Erro';
					vueFormModal.message = 'Por favor preencha todos os campos do formulário.';
					vueFormModal.error = true;
				},
				showErrorSave: () => {
					vueFormModal.status = 'Erro';
					vueFormModal.message = 'Um erro ocorreu ao tentar salvar o projeto, por favor tente novamente em alguns instantes.';
					vueFormModal.error = true;
				},
				showSuccess: () => {
					vueFormModal.status = 'Sucesso';
					vueFormModal.message = 'Seu projeto foi cadastrado com sucesso!';
					vueFormModal.error = false;
				},
				toDashboard: () => {
					window.location.href = '/';
				},
				show: () => {
					$('#answerModal').modal('show');
				}
			}
		});
	}
};

document.onreadystatechange = () => {
	let state = document.readyState;
	if (state === 'interactive') {
		page.init();
	}
};
