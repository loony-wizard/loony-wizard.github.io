'use strict';

function Keyboard() {

	let keyStates = {};

	window.onkeydown = function(event) {
		keyStates[event.keyCode] = true;
	}

	window.onkeyup = function(event) {
		keyStates[event.keyCode] = false;
	}

	this.isDown = function(keyCode) {
		return keyStates[keyCode] === true;
	}

  this.KEYS = {
    LEFT: 37,
    RIGHT: 39,
    D: 68,
    F: 70
  }
};
