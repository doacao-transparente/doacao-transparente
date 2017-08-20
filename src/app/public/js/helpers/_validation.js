const validation = {
	paintInput: (id) => {
		let target = $(id);
		if ((target) && (target.length > 0)) {
			if (target.val() === '') {
				target.addClass('bd-red');
			}
			else {
				target.removeClass('bd-red');
			}
		}
	}
};

export default validation;
