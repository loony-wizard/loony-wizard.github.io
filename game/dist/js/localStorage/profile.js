'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Profile = function () {
	function Profile() {
		_classCallCheck(this, Profile);

		var data = this.loadFromLocalStorage();
		for (var key in data) {
			this[key] = data[key];
		}
		if (this.localStorageIsEmpty()) {
			// init player data in local storage
			this.saveToLocalStorage();
		}
		this.setTotalScoreToPage();
	}

	_createClass(Profile, [{
		key: 'loadFromLocalStorage',
		value: function loadFromLocalStorage() {
			if (this.localStorageIsEmpty()) {
				return defaultStorageData['player'];
			} else {
				return JSON.parse(localStorage.getItem('playerProfile'));
			}
		}
	}, {
		key: 'saveToLocalStorage',
		value: function saveToLocalStorage() {
			localStorage.setItem('playerProfile', JSON.stringify({
				totalScore: this.totalScore
			}));
		}
	}, {
		key: 'localStorageIsEmpty',
		value: function localStorageIsEmpty() {
			var playerJSONData = localStorage.getItem('playerProfile');
			if (playerJSONData === null) return true;else return false;
		}
	}, {
		key: 'setTotalScoreToPage',
		value: function setTotalScoreToPage() {
			/* for example, from 1234567 I want to get 1.234.567$ */
			var element = document.getElementById('totalScore'),
			    strWithoutDots = '' + this.totalScore,
			    strWithDots = '$',
			    index = strWithoutDots.length - 1;
			while (index > 2) {
				strWithDots = '.' + strWithoutDots.slice(index - 2, index + 1) + strWithDots;
				index -= 3;
			}
			strWithDots = strWithoutDots.slice(0, index + 1) + strWithDots;
			element.innerHTML = strWithDots;
		}
	}]);

	return Profile;
}();