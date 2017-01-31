'use strict';

window.onload = function() {
	init();
};

function startGame() {
	showCanvas();
	lastTime = new Date().getTime();
	reinitGame();
	game();
}
