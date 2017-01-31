'use strict';

(function() {
  function showCanvas() {
    hideHTMLByWrapper();
  	let container = document.getElementById('containerForCanvas');
  	container.style.display = 'block';
  	let scoreBoard = document.getElementById('gameScore');
  	scoreBoard.style.opacity = 1;
  }
  function hideCanvas() {
    hideWrapper();
  	let container = document.getElementById('containerForCanvas');
  	container.style.display = 'none';
  	let scoreBoard = document.getElementById('gameScore');
  	scoreBoard.style.opacity = 0;
  };
  function hideWrapper() {
    let wrapper = document.getElementById('pageWrapper');
  	wrapper.style.display = 'none';
  }
  function hideHTMLByWrapper() {
  	let wrapper = document.getElementById('pageWrapper');
  	wrapper.style.display = 'block';
  }
  window.showCanvas = showCanvas;
  window.hideCanvas = hideCanvas;
})();
