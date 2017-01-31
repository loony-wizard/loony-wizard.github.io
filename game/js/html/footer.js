(function(){
	let keyboardButton = document.getElementById('keyboard');
	keyboardButton.addEventListener('mouseenter', () => {
		Array.from(document.getElementsByClassName('key')).forEach((key) => {
			key.style.opacity = 0.8; // 1 is black, 0.8 is gray
		});
	}, false);
	keyboardButton.addEventListener('mouseleave', () => {
		Array.from(document.getElementsByClassName('key')).forEach((key) => {
			key.style.opacity = 0;
		});
	}, false);
})();
