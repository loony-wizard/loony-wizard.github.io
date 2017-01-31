'use strict';

let UFO = (function() {
	let timeToThrow;
	class UFO extends Subject {
		constructor(args) {
			super(args);
			timeToThrow = 700; // ms
		}
		update() {
			if (this.direction === 'right') {
				if (this.px + this.speed * deltaTime <= this.movingRange.x.right) {
					this.px += this.speed * deltaTime;
				} else {
					this.direction = 'left';
				}
			} else {
				if (this.px - this.speed * deltaTime >= this.movingRange.x.left) {
					this.px -= this.speed * deltaTime;
				} else {
					this.direction = 'right';
				}
			}
			timeToThrow -= deltaTime * 100;
			if (timeToThrow <= 0) {
				if (!gameIsOver) this.throwSubject();
				this.calculateTimeToThrow();
			}
		}
		throwSubject() {
			fallingSubjects.push(this.createSubject());
		}
		createSubject() {
			// in case, when user health is not full
			let number, subject;
			if (healthScale.currentHealth === healthScale.size) {
				/*
				0 - 10: cake,
				11 - 13: dead cake,
				14: medicine heart
				*/
				number = getRandomInt(0, 13);
			} else {
				// just the same, but without medicine
				number = getRandomInt(0, 14);
			}
			if (number <= 10 - selectedLevelId) return this.initCake();
			else if (number <= 13) return this.initDeadCake();
			else return this.initHeart();
		}
		initCake() { 
			return new FallingSubject({
				sx: 64, sy: 56, px: this.px + this.sx/2 - 64/2, py: 140,
				imageFileName: './images/game/cake.png',
				speed: 14 * (1 + selectedLevelId * 1.2),
				isDangerous: false,
				isMedicine: false,
				price: 1
			});
		}		
		initDeadCake() { 
			return new FallingSubject({
				sx: 64, sy: 56, px: this.px + this.sx/2 - 64/2, py: 140,
				imageFileName: './images/game/deadCake.png',
				speed: 14 * (1 + selectedLevelId * 1.2),
				isDangerous: true,
				isMedicine: false,
				price: 0
			});
		}		
		initHeart() { 
			return new FallingSubject({
				sx: 27, sy: 27, px: this.px + this.sx/2 - 64/2, py: 140,
				imageFileName: './images/game/heart.png',
				speed: 14 * (1 + selectedLevelId * 1.2),
				isDangerous: false,
				isMedicine: true,
				price: 0
			});
		}		
		calculateTimeToThrow() {
			timeToThrow = getRandomInt(900, 1500) / (selectedLevelId + 1);
		}
	}
	function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	return UFO;

})();
