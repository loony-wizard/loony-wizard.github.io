'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Subject = function () {
  function Subject(args) {
    _classCallCheck(this, Subject);

    // size
    this.sx = args.sx;
    this.sy = args.sy;
    // position
    this.px = args.px;
    this.py = args.py;

    this.image = new Image();
    this.image.src = args.imageFileName;

    // extra for clouds, ufo, maybe some one else
    if (args.speed !== undefined) {
      this.speed = args.speed;
    }
    if (args.direction !== undefined) {
      this.direction = args.direction;
    }
    if (args.movingRange !== undefined) {
      this.movingRange = args.movingRange;
    }
  }

  _createClass(Subject, [{
    key: 'update',
    value: function update() {
      // this is for clouds and ufo
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
    }
  }, {
    key: 'draw',
    value: function draw() {
      screen.drawImage(this.image, this.px, this.py, this.sx, this.sy);
    }
  }]);

  return Subject;
}();