'use strict';

/**
 * author: Vladimir
 * created: 13.11.2016
 * modified: 13.11.2016
 *
 * searchNotesByTags is a function, which can search notes by tags
 */

function searchNotesByTags() {

	getStringWithTags()
		.then((string) => getTags(string))
		.then((tags) => showNotesWithTags(tags));

};

function setSearchHandler() {

	let input = document.getElementById('search');
	let events = ['keyup', 'onpaste', 'oncopy', 'oncut', 'input'];
	for (let i = 0; i < events.length; i++) {
		input.addEventListener(events[i], searchNotesByTags, false);
	}

};

function getStringWithTags() {

	return new Promise(function(resolve, reject) {

		let value = document.getElementById('search').value;
		if (typeof value === 'string') {
			resolve(value);
		} else {
			reject(new Error(value + ' is not a string!'));
		}

	});

};

function getTags(string) {
	
	// parse string and find all tags
	let tags = [];
	let regexp = /[!,\.;\(\)\[\]{} ]/gi; 
 	let set = new Set(string.split(regexp));
			
	set.forEach((tag, i, set) => {

	if (tag !== '#' && tag !== ' ' && tag !== '') {
		if (tag[0] === '#') {
			tags.push(tag);
		} else {
			tags.push('#' + tag);
		}
	}

	});

	return tags; 

};

function showNotesWithTags(tags) {

	notes.forEach((note, i, notes) => {
		note.div.style.display = 'inline-block';
	});
	notes.forEach((note) => {
		
		let coincidenceWasFound = false;
		
		// compare all written tags with all note tags
		note.tags.forEach((noteTag) => {
			tags.forEach((inputTag) => {
				let regexp = new RegExp(inputTag, 'i');
				if (regexp.test(noteTag)) {
					coincidenceWasFound = true;
				}
			});
		});

		if (!coincidenceWasFound && tags.length > 0) {
			note.div.style.display = 'none';
		}

	});

};