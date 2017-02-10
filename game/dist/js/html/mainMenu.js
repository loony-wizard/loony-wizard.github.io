'use strict';

(function () {
	var shopButton = document.getElementById('shopButton'),
	    playButton = document.getElementById('playButton'),
	    levelsDiv = document.getElementById('levels'),
	    shopDiv = document.getElementById('shop');

	playButton.addEventListener('mouseenter', function () {
		return addClass(levelsDiv, 'openedLevels');
	}, false);
	shopButton.addEventListener('mouseenter', function () {
		return addClass(shopDiv, 'openedShop');
	}, false);
})();