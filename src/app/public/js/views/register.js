'use-strict';

let vueRegister;
let vueFormModal;

let page = {

	init: () => {
		vueRegister = new Vue({
			el: '#registerUser',
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
							vueRegister.states = response.data;
							vueRegister.loadCities(response.data[0].value);
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
					vueRegister.checkForm()
						.then((isValid) => {
							if (isValid) {
								vueRegister.performSave();
							}
							else {
								vueFormModal.showErrorInvalidForm();
								vueFormModal.show();
							}
						});
				},
				checkForm: () => {
					let targets = [
						'name',
						'pass',
						'file',
						'state',
						'cityHall',
						'personalType',
						'cpfCnpj'
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
						type: 'POST'
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
					vueRegister.loadCities(value);
				},
				loadCities: (city) => {
					$.ajax({
						url: `/api/city/${city}`,
						type: 'GET'
					})
						.then((response) => {
							if (!response.error) {
								vueRegister.cities = response.data;
								console.warn(vueRegister.cities);
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
			mounted: () => {
				setTimeout(() => {
					vueFormModal.showErrorNotOpen();
					vueFormModal.show();
				}, 500);
			},
			methods: {
				showErrorNotOpen: () => {
					console.log('sua mae');
					vueFormModal.status = 'Erro';
					vueFormModal.message = 'Infelizmente os cadastros estão desabilitados.';
					vueFormModal.error = true;
				},
				showErrorInvalidForm: () => {
					vueFormModal.status = 'Erro';
					vueFormModal.message = 'Por favor preencha todos os campos do formulário.';
					vueFormModal.error = true;
				},
				showErrorSave: () => {
					vueFormModal.status = 'Erro';
					vueFormModal.message = 'Um erro ocorreu ao tentar salvar sua requisação, tente novamne em instantes.';
					vueFormModal.error = true;
				},
				showSuccess: () => {
					vueFormModal.status = 'Sucesso';
					vueFormModal.message = 'Seu usuário foi cadastrado com sucesso!';
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
