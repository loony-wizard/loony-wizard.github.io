'use strict';

let HealthScale = (function() {
	let hearts;
	let newHeart = (position) => {
		return new Subject({
			sx: 27, sy: 27, px: 790 - (27 + 2) * position, py: 4,
			imageFileName: imagesFilenames.heart
		});
	}
	class HealthScale {
		constructor(size) {
			this.size = size;
			this.currentHealth = this.size;
			hearts = [];
			for (let i = 0; i < this.size; i++) {
				hearts.push(newHeart(i + 1));
			}
		}
		addHeart() {
			if (this.currentHealth < this.size) {
				this.currentHealth++;
				hearts.push(newHeart(this.currentHealth));
			}
		}
		deleteHeart() {
			hearts.pop();
			this.currentHealth--;
			if (this.currentHealth === 0) gameOver();
		}
		draw() {
			hearts.forEach((heart) => heart.draw());
		}
	}
	return HealthScale;
})();
