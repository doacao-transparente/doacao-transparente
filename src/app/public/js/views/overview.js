'use-strict';

let vueCards;

let page = {
	init: () => {
		vueCards = new Vue({
			el: '#card-row',
			data: {
				cards: []
			},
			created: () => {
				$.ajax({
					url: `/project/view`,
					type: 'GET'
				})
					.then((response) => {
						if (!response.error) {
							vueCards.cards = response.data;
							console.warn(response);
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
				getComputedStyle: (value) => {
					return {'width': value + '%'};
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
