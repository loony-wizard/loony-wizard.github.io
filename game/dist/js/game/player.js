'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_Subject) {
	_inherits(Player, _Subject);

	function Player(playerArgs) {
		_classCallCheck(this, Player);

		var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, playerArgs));

		_this.score = 0;
		_this.keyboard = new Keyboard();
		_this.shield = new Shield();
		return _this;
	}

	_createClass(Player, [{
		key: 'reinitShield',
		value: function reinitShield() {
			this.shield = new Shield();
		}
	}, {
		key: 'update',
		value: function update() {
			if (this.keyboard.isDown(this.keyboard.KEYS.LEFT) && this.px - this.sx * deltaTime >= this.movingRange.x.left) {
				this.px -= this.speed * deltaTime;
				this.direction = 'left';
			}
			if (this.keyboard.isDown(this.keyboard.KEYS.RIGHT) && this.px + this.speed * deltaTime <= this.movingRange.x.right) {
				this.px += this.speed * deltaTime;
				this.direction = 'right';
			}
			if (this.keyboard.isDown(this.keyboard.KEYS.F)) {
				this.shield.isEnabled = true;
			} else {
				this.shield.isEnabled = false;
			}
		}
	}, {
		key: 'draw',
		value: function draw() {
			if (this.direction === 'right') {
				screen.drawImage(this.image, 0, 0, this.sx, this.sy, this.px, this.py, this.sx, this.sy);
			} else {
				screen.drawImage(this.image, this.sx, 0, this.sx, this.sy, this.px, this.py, this.sx, this.sy);
			}
		}
	}, {
		key: 'incScore',
		value: function incScore() {
			this.score++;
			this.updateScoreBoard();
		}
	}, {
		key: 'updateScoreBoard',
		value: function updateScoreBoard() {
			var scoreBoard = document.getElementById('gameScore');
			scoreBoard.innerHTML = this.score;
		}
	}]);

	return Player;
}(Subject);