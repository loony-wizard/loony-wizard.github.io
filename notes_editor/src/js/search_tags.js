'use strict';

/**
 * author: Vladimir
 * created: 10.11.2016
 * modified: 11.11.2016
 *
 * This is a function, which can search tags in string
 */

function searchTags(string) {

	let tags = [];
	let regexp = /[!,\.;\(\)\[\]{}\n\r\t ]/gi; 

 	let set = new Set(string.split(regexp));
 	
 	set.forEach((value, i, set) => {

 		let regexp = /#/;

 		if (regexp.test(value)) {

 			let position = value.search(regexp);
 			value = value.slice(position);

 			regexp = /&nbsp/;
 			if (regexp.test(value)) {

 				position = value.search(regexp);
 				value = value.slice(0, position);

 			}

 			if (value !== '#') {
 				tags.push(value);
 			}

 		}

 	});

 	return tags;

};