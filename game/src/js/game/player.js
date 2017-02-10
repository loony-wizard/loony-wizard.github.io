'use strict';

class Player extends Subject {

	constructor(playerArgs) {
		super(playerArgs);
		this.score = 0;
		this.keyboard = new Keyboard();
		this.shield = new Shield();
	}

	reinitShield() {
		this.shield = new Shield();
	}

	update() {
		if (this.keyboard.isDown(this.keyboard.KEYS.LEFT) &&
				this.px - this.sx * deltaTime >= this.movingRange.x.left) {
			this.px -= this.speed * deltaTime;
			this.direction = 'left';
		}
		if (this.keyboard.isDown(this.keyboard.KEYS.RIGHT) &&
				this.px + this.speed * deltaTime <= this.movingRange.x.right) {
			this.px += this.speed * deltaTime;
			this.direction = 'right';
		}
		if (this.keyboard.isDown(this.keyboard.KEYS.F)) {
			this.shield.isEnabled = true;
		} else {
			this.shield.isEnabled = false;
		}
	}

	draw() {
		if (this.direction === 'right') {
			screen.drawImage(this.image, 0, 0, this.sx, this.sy,
				this.px, this.py, this.sx, this.sy);
		} else {
			screen.drawImage(this.image, this.sx, 0, this.sx, this.sy,
				this.px, this.py, this.sx, this.sy);
		}
	}

	incScore() {
		this.score++;
		this.updateScoreBoard();
	}

	updateScoreBoard() {
		let scoreBoard = document.getElementById('gameScore');
		scoreBoard.innerHTML = this.score;
	}

}
