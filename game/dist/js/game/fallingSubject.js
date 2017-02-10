'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FallingSubject = function (_Subject) {
  _inherits(FallingSubject, _Subject);

  function FallingSubject(args) {
    _classCallCheck(this, FallingSubject);

    var _this = _possibleConstructorReturn(this, (FallingSubject.__proto__ || Object.getPrototypeOf(FallingSubject)).call(this, args));

    _this.isDangerous = args.isDangerous;
    _this.isMedicine = args.isMedicine;
    _this.price = args.price;
    return _this;
  }

  _createClass(FallingSubject, [{
    key: 'update',
    value: function update() {
      this.py += this.speed * deltaTime;
      if (this.isFell()) return true;
      return false;
    }
  }, {
    key: 'collisionsWithPlayer',
    value: function collisionsWithPlayer() {
      if (this.px + this.sx >= player.px && this.px <= player.px + player.sx && this.py + this.sy >= player.py) {
        if (!gameIsOver) {
          if (this.price === 1) player.incScore();
          if (this.isMedicine) healthScale.addHeart();

          if (this.isDangerous && !player.shield.isEnabled) healthScale.deleteHeart();
        }
        return true;
      }
    }
  }, {
    key: 'isFell',
    value: function isFell() {
      return this.py >= 600;
    }
  }]);

  return FallingSubject;
}(Subject);