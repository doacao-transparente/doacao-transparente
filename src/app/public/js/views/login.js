'use-strict';

import formValidate from '../helpers/_validation.js';

let vueFormLogin;
let vueFormModal;

let page = {
	init: () => {
		vueFormLogin = new Vue({
			el: '#loginForm',
			data: {
			},
			methods: {
				login: () => {
					let email = $('#email').val();
					let password = $('#password').val();

					if ((email !== '') && (password !== '')) {
						let data = {
							email: email,
							password: password
						};
						vueFormLogin.tryLogin(data);
					}
					else {
						vueFormLogin.validationErrors();
						vueFormModal.showErrorInvalidForm();
						vueFormModal.show();
					}
				},
				validationErrors: () => {
					formValidate.paintInput('#email');
					formValidate.paintInput('#password');
				},
				tryLogin: (params) => {
					$.ajax({
						url: `/login`,
						type: 'POST',
						data: params
					})
						.then((response) => {
							if (!response.error) {
								vueFormLogin.toDashboard();
							}
							else {
								console.warn(response);
								vueFormModal.showErrorInvalidCredentials();
								vueFormModal.show();
							}
						})
						.catch((error) => {
							console.warn(error);
							vueFormModal.showErrorInvalidCredentials();
							vueFormModal.show();
						});
				},
				toDashboard: () => {
					window.location.href = '/';
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
				showErrorInvalidCredentials: () => {
					vueFormModal.status = 'Erro';
					vueFormModal.message = 'Email e/ou senha inválidos';
					vueFormModal.error = true;
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
