'use strict';

(function () {
	var keyboardButton = document.getElementById('keyboard');
	keyboardButton.addEventListener('mouseenter', function () {
		Array.from(document.getElementsByClassName('key')).forEach(function (key) {
			key.style.opacity = 0.8; // 1 is black, 0.8 is gray
		});
	}, false);
	keyboardButton.addEventListener('mouseleave', function () {
		Array.from(document.getElementsByClassName('key')).forEach(function (key) {
			key.style.opacity = 0;
		});
	}, false);
})();