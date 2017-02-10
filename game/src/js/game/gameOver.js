'use strict';

function gameOver() {
  gameIsOver = true;
  gameOverImage = new Subject({
    sx: 216, sy: 320, px: canvas.width/2 - 216/2, py: 180,
    imageFileName: imagesFilenames.gameover
  });
  setTimeout(() => {
    updatePlayerTotalScore();
    setBestScore();
    goods.forEach((goods) => goods.changeButtonState());
    hideCanvas();
  }, 1000);
  function setBestScore() {
    let level = levels[selectedLevelId];
    let bestScore = level.bestScore;
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
