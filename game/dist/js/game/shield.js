'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shield = function () {
	var enabled = void 0,
	    speedOfDecrase = void 0,
	    speedOfIncrase = void 0,
	    maxSize = void 0,
	    isIncrasing = void 0;
	var args = {
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

	var Shield = function () {
		function Shield() {
			_classCallCheck(this, Shield);

			speedOfDecrase = 20 / goods[1].level;
			speedOfIncrase = 0.1 * goods[1].level;
			isIncrasing = false;
			maxSize = args.scaleState.sx;
			enabled = true;
			this.scale = new Subject(args.scale);
			this.scaleState = new Subject(args.scaleState);
			this.protection = new Subject(args.protection);
		}

		_createClass(Shield, [{
			key: 'update',
			value: function update() {
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
					if (this.scaleState.sx > maxSize / 10) isIncrasing = false;
					if (this.scaleState.sx >= maxSize) this.scaleState.sx = maxSize;
				}
			}
		}, {
			key: 'calculatePosition',
			value: function calculatePosition() {
				var playerCenterCoordinates = {
					x: player.px + player.sx / 2,
					y: player.py + player.sy / 2
				};
				this.protection.px = playerCenterCoordinates.x - this.protection.sx / 2;
				this.protection.py = playerCenterCoordinates.y - this.protection.sy / 2;
			}
		}, {
			key: 'isEnabled',
			set: function set(state) {
				if (this.scaleState.sx > 0 && state === true && !isIncrasing) {
					enabled = true;
				} else {
					enabled = false;
				}
			},
			get: function get() {
				return enabled;
			}
		}]);

		return Shield;
	}();

	return Shield;
}();