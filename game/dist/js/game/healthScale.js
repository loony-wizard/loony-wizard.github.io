'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HealthScale = function () {
	var hearts = void 0;
	var newHeart = function newHeart(position) {
		return new Subject({
			sx: 27, sy: 27, px: 790 - (27 + 2) * position, py: 4,
			imageFileName: imagesFilenames.heart
		});
	};

	var HealthScale = function () {
		function HealthScale(size) {
			_classCallCheck(this, HealthScale);

			this.size = size;
			this.currentHealth = this.size;
			hearts = [];
			for (var i = 0; i < this.size; i++) {
				hearts.push(newHeart(i + 1));
			}
		}

		_createClass(HealthScale, [{
			key: 'addHeart',
			value: function addHeart() {
				if (this.currentHealth < this.size) {
					this.currentHealth++;
					hearts.push(newHeart(this.currentHealth));
				}
			}
		}, {
			key: 'deleteHeart',
			value: function deleteHeart() {
				hearts.pop();
				this.currentHealth--;
				if (this.currentHealth === 0) gameOver();
			}
		}, {
			key: 'draw',
			value: function draw() {
				hearts.forEach(function (heart) {
					return heart.draw();
				});
			}
		}]);

		return HealthScale;
	}();

	return HealthScale;
}();