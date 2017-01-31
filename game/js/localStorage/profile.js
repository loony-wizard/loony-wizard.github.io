'use strict';

class Profile {

	constructor() {
		let data = this.loadFromLocalStorage();
		for (let key in data) {
			this[key] = data[key];
		}
		if (this.localStorageIsEmpty()) {
			// init player data in local storage
			this.saveToLocalStorage();
		}
		this.setTotalScoreToPage();
	}

	loadFromLocalStorage() {
		if (this.localStorageIsEmpty()) {
			return defaultStorageData['player'];
		} else {
			return JSON.parse(localStorage.getItem('playerProfile'));
		}
	}

	saveToLocalStorage() {
		localStorage.setItem('playerProfile', JSON.stringify({
			totalScore: this.totalScore
		}));
	}

	localStorageIsEmpty() {
		let playerJSONData = localStorage.getItem('playerProfile');
		if (playerJSONData === null) return true;
		else return false;
	}

	setTotalScoreToPage() {
		/* for example, from 1234567 I want to get 1.234.567$ */
		let element = document.getElementById('totalScore'),
			strWithoutDots = `${this.totalScore}`,
			strWithDots = '$',
			index = strWithoutDots.length - 1;
		while(index > 2) {
			strWithDots = '.' + strWithoutDots.slice(index - 2, index + 1) + strWithDots;
			index -= 3;
		}
		strWithDots = strWithoutDots.slice(0, index + 1) + strWithDots;
		element.innerHTML = strWithDots;
	}

}
