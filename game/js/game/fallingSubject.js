'use strict';

class FallingSubject extends Subject {
  constructor(args) {
    super(args);
    this.isDangerous = args.isDangerous;
    this.isMedicine = args.isMedicine;
    this.price = args.price;
  }
  update() {
    this.py += this.speed * deltaTime;
    if (this.isFell()) return true;
    return false;
  }
  collisionsWithPlayer() {
    if (this.px + this.sx >= player.px && this.px <= player.px + player.sx &&
      this.py + this.sy >= player.py) {
        if (!gameIsOver) {
          if (this.price === 1) player.incScore();
          if (this.isMedicine) healthScale.addHeart();

          if (this.isDangerous && !player.shield.isEnabled) healthScale.deleteHeart();
        }
        return true;
      }
  }
  isFell() {
    return this.py >= 600;
  }
}
