'use strict';

(function () {
  function showCanvas() {
    hideHTMLByWrapper();
    var container = document.getElementById('containerForCanvas');
    container.style.display = 'block';
    var scoreBoard = document.getElementById('gameScore');
    scoreBoard.style.opacity = 1;
  }
  function hideCanvas() {
    hideWrapper();
    var container = document.getElementById('containerForCanvas');
    container.style.display = 'none';
    var scoreBoard = document.getElementById('gameScore');
    scoreBoard.style.opacity = 0;
  };
  function hideWrapper() {
    var wrapper = document.getElementById('pageWrapper');
    wrapper.style.display = 'none';
  }
  function hideHTMLByWrapper() {
    var wrapper = document.getElementById('pageWrapper');
    wrapper.style.display = 'block';
  }
  window.showCanvas = showCanvas;
  window.hideCanvas = hideCanvas;
})();