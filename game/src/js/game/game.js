'use strict';

window.requestAnimationFrame =  ( 
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
		window.setTimeout( callback, 1000 / 60 );
	}
);

function game() {
	currentTime = new Date().getTime();
	deltaTime = (currentTime - lastTime) * 0.01;
	lastTime = currentTime;

	screen.clearRect(0, 0, canvas.width, canvas.height);

	clouds.forEach((cloud) => {
		cloud.update();
		cloud.draw();
	});

	ground.draw();

	let subjectsToDelete = [];
	fallingSubjects.forEach((subject) => {
		// cakes, dead cakes and hearts
		// if cake fell or was eaten by player, these methods return true
		subjectsToDelete.push(subject.update() || subject.collisionsWithPlayer());
		subject.draw();
	});

	(function(){
		let tmp = [];
		fallingSubjects.forEach((subject, i) => {
			if (!subjectsToDelete[i]) tmp.push(subject);
		});
		fallingSubjects = tmp;
	})();

	ufo.update();
	ufo.draw();

	player.update();
	player.draw();

	healthScale.draw();

	player.shield.update();
	if (goods[1].level > 0) {
		player.shield.scale.draw();
		player.shield.scaleState.draw();
		if (player.shield.isEnabled) player.shield.protection.draw();
	}

	if (gameIsOver) gameOverImage.draw();

	window.requestAnimationFrame(game);
}
