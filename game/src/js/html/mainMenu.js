(function(){
	let shopButton = document.getElementById('shopButton'),
		playButton = document.getElementById('playButton'),
		levelsDiv = document.getElementById('levels'),
		shopDiv = document.getElementById('shop');

	playButton.addEventListener('mouseenter', () => addClass(levelsDiv, 'openedLevels'), false);
	shopButton.addEventListener('mouseenter', () => addClass(shopDiv, 'openedShop'), false);
})();
