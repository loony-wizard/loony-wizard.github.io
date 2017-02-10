'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UFO = function () {
	var timeToThrow = void 0;

	var UFO = function (_Subject) {
		_inherits(UFO, _Subject);

		function UFO(args) {
			_classCallCheck(this, UFO);

			var _this = _possibleConstructorReturn(this, (UFO.__proto__ || Object.getPrototypeOf(UFO)).call(this, args));

			timeToThrow = 700; // ms
			return _this;
		}

		_createClass(UFO, [{
			key: 'update',
			value: function update() {
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
		}, {
			key: 'throwSubject',
			value: function throwSubject() {
				fallingSubjects.push(this.createSubject());
			}
		}, {
			key: 'createSubject',
			value: function createSubject() {
				// in case, when user health is not full
				var number = void 0,
				    subject = void 0;
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
				if (number <= 10 - selectedLevelId) return this.initCake();else if (number <= 13) return this.initDeadCake();else return this.initHeart();
			}
		}, {
			key: 'initCake',
			value: function initCake() {
				return new FallingSubject({
					sx: 64, sy: 56, px: this.px + this.sx / 2 - 64 / 2, py: 140,
					imageFileName: './images/game/cake.png',
					speed: 14 * (1 + selectedLevelId * 1.2),
					isDangerous: false,
					isMedicine: false,
					price: 1
				});
			}
		}, {
			key: 'initDeadCake',
			value: function initDeadCake() {
				return new FallingSubject({
					sx: 64, sy: 56, px: this.px + this.sx / 2 - 64 / 2, py: 140,
					imageFileName: './images/game/deadCake.png',
					speed: 14 * (1 + selectedLevelId * 1.2),
					isDangerous: true,
					isMedicine: false,
					price: 0
				});
			}
		}, {
			key: 'initHeart',
			value: function initHeart() {
				return new FallingSubject({
					sx: 27, sy: 27, px: this.px + this.sx / 2 - 64 / 2, py: 140,
					imageFileName: './images/game/heart.png',
					speed: 14 * (1 + selectedLevelId * 1.2),
					isDangerous: false,
					isMedicine: true,
					price: 0
				});
			}
		}, {
			key: 'calculateTimeToThrow',
			value: function calculateTimeToThrow() {
				timeToThrow = getRandomInt(900, 1500) / (selectedLevelId + 1);
			}
		}]);

		return UFO;
	}(Subject);

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	return UFO;
}();