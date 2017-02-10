'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Goods = function () {
	function Goods(goodsId) {
		_classCallCheck(this, Goods);

		var data = this.loadFromLocalStorage(goodsId);
		for (var key in data) {
			this[key] = data[key];
		}
		if (this.localStorageIsEmpty(this.id)) {
			// first time in the game, init goods in local storage
			this.saveToLocalStorage();
		}
		this.putToPage();
	}

	_createClass(Goods, [{
		key: 'loadFromLocalStorage',
		value: function loadFromLocalStorage(goodsId) {
			if (this.localStorageIsEmpty(goodsId)) {
				return defaultStorageData['goods'][goodsId];
			} else {
				return JSON.parse(localStorage.getItem('goods' + goodsId));
			}
		}
	}, {
		key: 'localStorageIsEmpty',
		value: function localStorageIsEmpty(goodsId) {
			var goodsJSONData = localStorage.getItem('goods' + goodsId);
			if (goodsJSONData === null) return true;else return false;
		}
	}, {
		key: 'upgrade',
		value: function upgrade() {
			playerProfile.totalScore -= this.price[this.level];
			playerProfile.setTotalScoreToPage();
			playerProfile.saveToLocalStorage();
			this.level++;
			this.saveToLocalStorage();
			this.changeHeaderOnPage();
			goods.forEach(function (goods) {
				goods.changeButtonState();
			});
		}
	}, {
		key: 'putToPage',
		value: function putToPage() {
			var _this = this;

			var parentDiv = document.getElementById('containerForGoods'),
			    goodsDiv = document.createElement('div'),
			    name = document.createElement('h2'),
			    description = document.createElement('p');

			goodsDiv.id = 'goods' + this.id;
			addClass(goodsDiv, 'goods');

			// name of the goods
			if (this.level === 0) {
				name.innerHTML = this.name + ' not bought';
			} else {
				name.innerHTML = this.name + ' level ' + this.level;
			}
			name.id = 'goodsHeader' + this.id;
			addClass(name, 'name');
			goodsDiv.appendChild(name);

			// description of the goods
			description.innerHTML = this.description;
			goodsDiv.appendChild(description);

			// upgrade button
			if (this.level < this.maxLevel) {
				var upgradeBtn = document.createElement('div');

				addClass(upgradeBtn, 'upgradeBtn');
				upgradeBtn.id = 'upgradeBtn' + this.id;

				if (playerProfile.totalScore >= this.price[this.level]) {
					upgradeBtn.innerHTML = 'UPGRADE TO LEVEL ' + (this.level + 1) + ' FOR ' + this.price[this.level] + '$';
					upgradeBtn.onclick = function () {
						return _this.upgrade.call(_this);
					};
				} else {
					upgradeBtn.innerHTML = 'NO MONEY FOR NEXT UPGRADE (' + this.price[this.level] + '$)';
				}

				goodsDiv.appendChild(upgradeBtn);
			}

			parentDiv.appendChild(goodsDiv);
		}
	}, {
		key: 'saveToLocalStorage',
		value: function saveToLocalStorage() {
			localStorage.setItem('goods' + this.id, JSON.stringify({
				id: this.id,
				name: this.name,
				maxLevel: this.maxLevel,
				level: this.level,
				price: this.price,
				description: this.description
			}));
		}
	}, {
		key: 'changeHeaderOnPage',
		value: function changeHeaderOnPage() {
			// for example, from 'SHIELD not bougth' to 'SHIELD' level 1
			var elem = document.getElementById('goodsHeader' + this.id);
			elem.innerHTML = this.name + ' level ' + this.level;
		}
	}, {
		key: 'changeButtonState',
		value: function changeButtonState() {
			var _this2 = this;

			var btn = document.getElementById('upgradeBtn' + this.id);
			// maybe, button was removed, when last upgrade was bought
			if (btn !== null) {
				if (this.level === this.maxLevel) {
					// there is nothing to upgrade
					btn.parentElement.removeChild(btn);
				} else if (playerProfile.totalScore < this.price[this.level]) {
					btn.innerHTML = 'NO MONEY FOR NEXT UPGRADE';
					btn.onclick = null;
				} else {
					btn.innerHTML = 'UPGRADE TO LEVEL ' + (this.level + 1) + ' | ' + this.price[this.level] + '$';
					btn.onclick = function () {
						return _this2.upgrade.call(_this2);
					};
				}
			}
		}
	}], [{
		key: 'initGoods',
		value: function initGoods() {
			var goods = [];
			for (var i = 0; i < defaultStorageData['countOfGoods']; i++) {
				goods.push(new Goods(i));
			}return goods;
		}
	}]);

	return Goods;
}();

;