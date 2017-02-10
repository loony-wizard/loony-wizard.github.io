'use strict';

class Level {

	constructor(levelId) {
		let data = this.loadFromLocalStorage(levelId);
		for (let key in data) {
			this[key] = data[key];
		}
		if (this.localStorageIsEmpty(this.id)) {
			// first time in the game, init levels in local storage
			this.saveToLocalStorage();
		}
		this.putToPage();
	}

	loadFromLocalStorage(levelId) {
		if (this.localStorageIsEmpty(levelId)) {
			return defaultStorageData['levels'][levelId];
		} else {
			return JSON.parse(localStorage.getItem(`level${levelId}`));
		}
	}

	localStorageIsEmpty(levelId) {
		let levelJSONData = localStorage.getItem(`level${levelId}`);
		if (levelJSONData === null) return true;
		else return false;
	}

	putToPage() {
		let parentDiv = document.getElementById('containerForLevels'),
			levelDiv = document.createElement('div'),
			levelHeader = document.createElement('h2'),
			bestScore = document.createElement('h3');

		levelDiv.id = `level${this.id}`;
		addClass(levelDiv, 'level');
		
		levelHeader.innerHTML = this.levelName;
		addClass(levelHeader, 'levelHeader');
		levelDiv.appendChild(levelHeader);
		levelDiv.appendChild(document.createElement('br'));
		
		bestScore.innerHTML = `BEST SCORE : ${this.bestScore}`;
		bestScore.id = `level${this.id}bestScore`;
		levelDiv.appendChild(bestScore);

		levelDiv.onclick = () => {
			selectedLevelId = this.id;
			startGame();
		};

		parentDiv.appendChild(levelDiv);
		parentDiv.appendChild(document.createElement('br'));
	}

	saveToLocalStorage() {
		localStorage.setItem(`level${this.id}`, JSON.stringify({
			id: this.id,
			levelName: this.levelName,
			bestScore: this.bestScore
		}));
	}

	setBestScoreToPage() {
		let elem = document.getElementById(`level${this.id}bestScore`);
		elem.innerHTML = `BEST SCORE : ${this.bestScore}`;
	}

	static initLevels() {
		let levels = [];
		for (let i = 0; i < 3; i++) levels.push(new Level(i));
		return levels;
	}

};
