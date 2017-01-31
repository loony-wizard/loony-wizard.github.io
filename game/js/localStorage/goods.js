'use strict';

class Goods {

	constructor(goodsId) {
		let data = this.loadFromLocalStorage(goodsId);
		for (let key in data) {
			this[key] = data[key];
		}
		if (this.localStorageIsEmpty(this.id)) {
			// first time in the game, init goods in local storage
			this.saveToLocalStorage();
		}
		this.putToPage();
	}

	loadFromLocalStorage(goodsId) {
		if (this.localStorageIsEmpty(goodsId)) {
			return defaultStorageData['goods'][goodsId];
		} else {
			return JSON.parse(localStorage.getItem(`goods${goodsId}`));
		}
	}

	localStorageIsEmpty(goodsId) {
		let goodsJSONData = localStorage.getItem(`goods${goodsId}`);
		if (goodsJSONData === null) return true;
		else return false;
	}

	upgrade() {
		playerProfile.totalScore -= this.price[this.level];
		playerProfile.setTotalScoreToPage();
		playerProfile.saveToLocalStorage();
		this.level++;
		this.saveToLocalStorage();
		this.changeHeaderOnPage();
		goods.forEach((goods) => {
			goods.changeButtonState()
		});
	}

	putToPage() {
		let parentDiv = document.getElementById('containerForGoods'),
			goodsDiv = document.createElement('div'),
			name = document.createElement('h2'),
			description = document.createElement('p');

		goodsDiv.id = `goods${this.id}`;
		addClass(goodsDiv, 'goods');
		
		// name of the goods
		if (this.level === 0) {
			name.innerHTML = `${this.name} not bought`;
		} else {
			name.innerHTML = `${this.name} level ${this.level}`;
		}
		name.id = `goodsHeader${this.id}`;
		addClass(name, 'name');
		goodsDiv.appendChild(name);
		
		// description of the goods
		description.innerHTML = this.description;
		goodsDiv.appendChild(description);

		// upgrade button
		if (this.level < this.maxLevel) {
			let upgradeBtn = document.createElement('div');
			
			addClass(upgradeBtn, 'upgradeBtn');
			upgradeBtn.id = `upgradeBtn${this.id}`;
			
			if (playerProfile.totalScore >= this.price[this.level]) {
				upgradeBtn.innerHTML = `UPGRADE TO LEVEL ${this.level + 1} FOR ${this.price[this.level]}$`;
				upgradeBtn.onclick = () => this.upgrade.call(this);
			} else {
				upgradeBtn.innerHTML = `NO MONEY FOR NEXT UPGRADE (${this.price[this.level]}$)`;
			}

			goodsDiv.appendChild(upgradeBtn);
		}

		parentDiv.appendChild(goodsDiv);
	}

	saveToLocalStorage() {
		localStorage.setItem(`goods${this.id}`, JSON.stringify({
			id: this.id,
			name: this.name,
			maxLevel: this.maxLevel,
			level: this.level,
			price: this.price,
			description: this.description
		}));
	}

	changeHeaderOnPage() {
		// for example, from 'SHIELD not bougth' to 'SHIELD' level 1
		let elem = document.getElementById(`goodsHeader${this.id}`);
		elem.innerHTML = `${this.name} level ${this.level}`;
	}

	changeButtonState() {
		let btn = document.getElementById(`upgradeBtn${this.id}`);
		// maybe, button was removed, when last upgrade was bought
		if (btn !== null) {
			if (this.level === this.maxLevel) {
				// there is nothing to upgrade
				btn.parentElement.removeChild(btn);
			} else if (playerProfile.totalScore < this.price[this.level]) {
				btn.innerHTML = 'NO MONEY FOR NEXT UPGRADE';
				btn.onclick = null;
			} else {
				btn.innerHTML = `UPGRADE TO LEVEL ${this.level + 1} | ${this.price[this.level]}$`;
				btn.onclick = () => this.upgrade.call(this);
			}
		}
	}

	static initGoods() {
		let goods = [];
		for (let i = 0; i < defaultStorageData['countOfGoods']; i++)
			goods.push(new Goods(i));
		return goods;
	}

};
