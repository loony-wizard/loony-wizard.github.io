'use strict';

let Shield = (function() {
	let enabled,
		speedOfDecrase,
		speedOfIncrase,
		maxSize,
		isIncrasing;
	let args = {
		scale: { // this is shield's scale
			sx: 220, sy: 16, px: 0, py: 5, imageFileName: imagesFilenames.scale
		},
		scaleState: { // this is shield's scale state
			sx: 211, sy: 12, px: 5, py: 7, imageFileName: imagesFilenames.scaleState
		},
		protection: { // this is shield's protection circle
			sx: 220, sy: 220, px: 0, py: 0, imageFileName: imagesFilenames.shield
		}
	};
	class Shield {
		constructor() {
			speedOfDecrase = 20 / goods[1].level;
			speedOfIncrase = 0.1 * goods[1].level;
			isIncrasing = false;
			maxSize = args.scaleState.sx;
			enabled = true;
			this.scale = new Subject(args.scale);
			this.scaleState = new Subject(args.scaleState);
			this.protection = new Subject(args.protection);
		}
		set isEnabled(state) {
			if (this.scaleState.sx > 0 && state === true && !isIncrasing) {
				enabled = true;
			} else {
				enabled = false;
			}
		}
		get isEnabled() {
			return enabled;
		}
		update() {
			this.calculatePosition();
			if (enabled) {
				this.scaleState.sx -= speedOfDecrase * deltaTime;
				if (this.scaleState.sx <= 0) {
					this.scaleState.sx = 0;
					enabled = false;
					isIncrasing = true;
				}
			} else {
				this.scaleState.sx += speedOfIncrase * deltaTime;
				if (this.scaleState.sx > maxSize/10) isIncrasing = false;
				if (this.scaleState.sx >= maxSize) this.scaleState.sx = maxSize;
			}
		}
		calculatePosition() {
			let playerCenterCoordinates = {
				x: player.px + player.sx/2,
				y: player.py + player.sy/2
			};
			this.protection.px = playerCenterCoordinates.x - this.protection.sx/2;
			this.protection.py = playerCenterCoordinates.y - this.protection.sy/2;
		}
	}

	return Shield;
})();
