let playerProfile,
	levels,
	goods,
	canvas,
	screen,
	requestAnimationFrame,
	ground,
	clouds,
	ufo,
	player,
	healthScale,
	fallingSubjects,
	lastTime,
	currentTime,
	deltaTime,
	selectedLevelId,
	gameIsOver,
	gameOverImage;

let imagesFilenames = {
	ground: './images/game/ground.png',
	cloud0: './images/game/cloud0.png',
	cloud1: './images/game/cloud1.png',
	cake: './images/game/cake.png',
	deadCake: './images/game/deadCake.png',
	heart: './images/game/heart.png',
	scale: './images/game/scale.png',
	scaleState: './images/game/scaleState.png',
	shield: './images/game/shield.png',
	ufo: './images/game/ufo.png',
	player: './images/game/player.png',
	gameover: './images/game/gameover.png'
};

function reinitGame() {
	gameIsOver = false;
	healthScale = new HealthScale(3 + goods[0].level);
	ufo.speed = 25 + 18 * selectedLevelId * 1.7;
	player.speed = 105 + 65 * selectedLevelId * 0.7;
	player.reinitShield();
	fallingSubjects = [];
	player.score = 0;
}

function init() {

	playerProfile = new Profile();

	levels = Level.initLevels();

	goods = Goods.initGoods();

	// canvas and 2d context
	[canvas, screen] = initCanvas();

	requestAnimationFrame = initRequestAnimationFrame();

	// goods[0] : additional hearts
	healthScale = new HealthScale(3 + goods[0].level);

	// init game subjects
	fallingSubjects = [];
	ground = new Subject({
		sx: 777, sy: 111, px: 12, py: 588, imageFileName: imagesFilenames.ground
	});
	clouds = [
		new Subject({
			sx: 208, sy: 102, px: 50, py: 100, imageFileName: imagesFilenames.cloud0,
			speed: 1,
			movingRange: {
				x: { left: 50, right: 430 },
				y: { left: 100, right: 100 }
			},
			direction: 'right'
		}),
		new Subject({
			sx: 224, sy: 76, px: 400, py: 230, imageFileName: imagesFilenames.cloud1,
			speed: 1.3,
			movingRange: {
				x: { left: 200, right: 560 },
				y: { left: 230, right: 230 }
			},
			direction: 'right'
		})
	];
	ufo = new UFO({
		sx: 190, sy: 165, px: 300, py: 35, imageFileName: imagesFilenames.ufo,
		speed: 10,
		movingRange: {
			x: { left: 10, right: 600 },
			y: { left: 35, right: 35 }
		},
		direction: 'right'
	});
	player = new Player(
		{ // the player
			sx: 135, sy: 110, px: 300, py: 530, imageFileName: imagesFilenames.player,
			speed: 55,
			movingRange: {
				x: { left: 0, right: canvas.width - 135 },
				y: { left: 510, right: 510 }
			},
			direction: 'right'
		}
	);
}

function initRequestAnimationFrame() {
		let requestAnimationFrame = window.requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame;
		return requestAnimationFrame;
	};

function initCanvas() {
	let canvas = document.getElementById('gameScreen');
	let ctx = canvas.getContext('2d');
	return [canvas, ctx];
}
