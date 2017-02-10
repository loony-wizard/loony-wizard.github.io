'use strict';

function gameOver() {
  gameIsOver = true;
  gameOverImage = new Subject({
    sx: 216, sy: 320, px: canvas.width / 2 - 216 / 2, py: 180,
    imageFileName: imagesFilenames.gameover
  });
  setTimeout(function () {
    updatePlayerTotalScore();
    setBestScore();
    goods.forEach(function (goods) {
      return goods.changeButtonState();
    });
    hideCanvas();
  }, 1000);
  function setBestScore() {
    var level = levels[selectedLevelId];
    var bestScore = level.bestScore;
    if (player.score > bestScore) {
      level.bestScore = player.score;
      level.saveToLocalStorage();
      level.setBestScoreToPage();
    }
  };
  function updatePlayerTotalScore() {
    playerProfile.totalScore += player.score;
    playerProfile.setTotalScoreToPage();
    playerProfile.saveToLocalStorage();
  };
};