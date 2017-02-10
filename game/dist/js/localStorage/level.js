'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Level = function () {
	function Level(levelId) {
		_classCallCheck(this, Level);

		var data = this.loadFromLocalStorage(levelId);
		for (var key in data) {
			this[key] = data[key];
		}
		if (this.localStorageIsEmpty(this.id)) {
			// first time in the game, init levels in local storage
			this.saveToLocalStorage();
		}
		this.putToPage();
	}

	_createClass(Level, [{
		key: 'loadFromLocalStorage',
		value: function loadFromLocalStorage(levelId) {
			if (this.localStorageIsEmpty(levelId)) {
				return defaultStorageData['levels'][levelId];
			} else {
				return JSON.parse(localStorage.getItem('level' + levelId));
			}
		}
	}, {
		key: 'localStorageIsEmpty',
		value: function localStorageIsEmpty(levelId) {
			var levelJSONData = localStorage.getItem('level' + levelId);
			if (levelJSONData === null) return true;else return false;
		}
	}, {
		key: 'putToPage',
		value: function putToPage() {
			var _this = this;

			var parentDiv = document.getElementById('containerForLevels'),
			    levelDiv = document.createElement('div'),
			    levelHeader = document.createElement('h2'),
			    bestScore = document.createElement('h3');

			levelDiv.id = 'level' + this.id;
			addClass(levelDiv, 'level');

			levelHeader.innerHTML = this.levelName;
			addClass(levelHeader, 'levelHeader');
			levelDiv.appendChild(levelHeader);
			levelDiv.appendChild(document.createElement('br'));

			bestScore.innerHTML = 'BEST SCORE : ' + this.bestScore;
			bestScore.id = 'level' + this.id + 'bestScore';
			levelDiv.appendChild(bestScore);

			levelDiv.onclick = function () {
				selectedLevelId = _this.id;
				startGame();
			};

			parentDiv.appendChild(levelDiv);
			parentDiv.appendChild(document.createElement('br'));
		}
	}, {
		key: 'saveToLocalStorage',
		value: function saveToLocalStorage() {
			localStorage.setItem('level' + this.id, JSON.stringify({
				id: this.id,
				levelName: this.levelName,
				bestScore: this.bestScore
			}));
		}
	}, {
		key: 'setBestScoreToPage',
		value: function setBestScoreToPage() {
			var elem = document.getElementById('level' + this.id + 'bestScore');
			elem.innerHTML = 'BEST SCORE : ' + this.bestScore;
		}
	}], [{
		key: 'initLevels',
		value: function initLevels() {
			var levels = [];
			for (var i = 0; i < 3; i++) {
				levels.push(new Level(i));
			}return levels;
		}
	}]);

	return Level;
}();

;