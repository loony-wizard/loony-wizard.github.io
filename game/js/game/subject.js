'use strict';

class Subject {

  constructor(args) {
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
      this.direction = args.direction
    }
    if (args.movingRange !== undefined) {
      this.movingRange = args.movingRange;
    }
  }

  update() {
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

  draw() {
    screen.drawImage(this.image, this.px, this.py, this.sx, this.sy);
  }

}
