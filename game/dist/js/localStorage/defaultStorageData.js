'use strict';

var defaultStorageData = {
	player: {
		totalScore: 0
	},
	levels: [{
		id: 0,
		levelName: 'BEGINNER',
		bestScore: 0
	}, {
		id: 1,
		levelName: 'MIDDLE',
		bestScore: 0
	}, {
		id: 2,
		levelName: 'HARDCORE',
		bestScore: 0
	}],
	countOfGoods: 2,
	goods: [{
		id: 0,
		name: 'ADDITIONAL HEALTH',
		level: 0,
		maxLevel: 3,
		price: [500, 4000, 25000],
		description: 'It gives you one additional live, one heart to health scale.'
	}, {
		id: 1,
		name: 'SHIELD',
		level: 0,
		maxLevel: 4,
		price: [200, 900, 5000, 12000],
		description: 'The Shield saves you from dangerous things from the air.<br>press F to use.'
	}]
};