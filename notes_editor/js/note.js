'use strict';

/**
 * author: Vladimir
 * created: 9.11.2016
 * modified: 13.11.2016
 *
 * In this I describe class Note and methods to work with notes
 */

/* just an array with all notes on the page, really usefull */
let notes = [];

class Note {

	constructor(div, tags) {
	
		this.div = div;
		if (tags === undefined) {
			this.tags = [];
		} else {
			this.tags = tags;
		}
	
	};

	static createNote() {

		let div = document.createElement('div');
		div.className = 'note';
		div.id = this.prototype.idForNewNote();

		let deleteNoteWrapper = document.createElement('div');
		deleteNoteWrapper.className = 'delete_note_wrapper';
		let deleteNoteImage = document.createElement('img');
		deleteNoteImage.src = './images/cross.png';
		deleteNoteWrapper.appendChild(deleteNoteImage);
		div.appendChild(deleteNoteWrapper);

		let textarea = document.createElement('textarea');
		textarea.className = 'input';
		div.appendChild(textarea);
		// let inputDiv = document.createElement('div');
		// inputDiv.className = 'input';
		// inputDiv.setAttribute('contenteditable', 'true');
		// div.appendChild(inputDiv);

		let tagsDiv = document.createElement('div');
		tagsDiv.className = 'tags';
		let p = document.createElement('p');
		p.innerHTML = 'This note hasn\'t got any tags yet.';
		tagsDiv.appendChild(p);
		div.appendChild(tagsDiv);

		let note = new Note(div);

		notes.push(note);
		
		note.putToPage();
		note.saveToLocalStorage();
		note.saveNotesIdentificatorsToLocalStorage();
		note.setHandlers();

		return note;

	};

	static loadNotesFromLocalStorage() {

		// get array with identificators
		let data = localStorage.getItem('notesIdentificators');

		if (data === null) return; /* this is the first start */
		
		let identificators = JSON.parse(data);

		// load every note
		for (let i = 0; i < identificators.length; i++) {
			
			let json = localStorage.getItem(identificators[i]);
			let data = JSON.parse(json);
			let tmp = document.createElement('div');
			tmp.innerHTML = data['div'];
			let div = tmp.firstChild;
			div.getElementsByClassName('input')[0].value = data['note'];
			let tags = JSON.parse(data['tags']);

			let note = new Note(div, tags);
			note.putToPage();
			note.setHandlers();
			notes.push(note);
			
		}

	};

	delete() {

		// TODO: add ask before deleting dialog

		// delete html element
		this.div.parentElement.removeChild(this.div);

		// delete note from array notes
		let index = notes.indexOf(this);
		notes.splice(index, 1);

		// delete note from localStorage
		this.deleteFromLocalStorage();

	};

};

Note.prototype.putToPage = function() {

	let countOfNotes = document.getElementsByClassName('note');

	if (countOfNotes === 0) {
		document.getElementById('notes').appendChild(this.div);
	} else {
		document.getElementById('notes').insertBefore(
			this.div, document.getElementsByClassName('note')[0]
		);
	}

};

Note.prototype.setHandlers = function() {
	let typingHandler = () => {

		new Promise((resolve, reject) => {

			// parse text and find all tags
			let input = this.div.getElementsByClassName('input')[0];
			let tags = searchTags(input.value);
			resolve(tags);

		})
			.then((tags) => {

				this.tags = tags;
				let tagsDiv = this.div.getElementsByClassName('tags')[0];

				if (tags.length > 0) {

					tagsDiv.innerHTML = '';

					// create html elements for tags
					tags.forEach((tag, i, tags) => {

						let div = document.createElement('div');
						div.className = 'tag';
						div.innerHTML = tag;
						tagsDiv.appendChild(div);

					});

				} else {

					tagsDiv.innerHTML = '<p>This note hasn\'t got any tags yet.</p>';

				}

			});

		this.saveToLocalStorage();


	};

	let deletingHandler = () => {
		this.delete();
	};

	let events = ['keyup', 'onpaste', 'oncopy', 'oncut', 'input'];
	for (let i = 0; i < events.length; i++) {
		this.div.addEventListener(events[i], typingHandler, false);
	}

	this.div.getElementsByTagName('img')[0].onclick = deletingHandler;
};

Note.prototype.saveToLocalStorage = function() {

	let data = {};
	data['div'] = this.div.outerHTML;
	data['note'] = this.div.getElementsByClassName('input')[0].value;
	data['tags'] = JSON.stringify(this.tags);
	let json = JSON.stringify(data);
	localStorage.setItem(this.div.id, json);

};

Note.prototype.deleteFromLocalStorage = function() {
	
	// delete identificator
	let json = localStorage.getItem('notesIdentificators');
	let identificators = JSON.parse(json);

	let index = identificators.indexOf(this.div.id);
	identificators.splice(index, 1);

	localStorage.removeItem(this.div.id);
	localStorage.setItem('notesIdentificators', JSON.stringify(identificators));

};

Note.prototype.saveNotesIdentificatorsToLocalStorage = () => {

	let data = [];
	for (let i = 0; i < notes.length; i++) {
		data.push(notes[i].div.id);
	}
	let json = JSON.stringify(data);
	localStorage.setItem('notesIdentificators', json);

};

Note.prototype.idForNewNote = () => {

	if (notes.length === 0) return 'note0';

	// get XXX numbers in 'noteXXX'
	// (*) XXX sequence begins from 4th symbol in 'noteXXX'

	return 'note' + (parseInt(notes[notes.length - 1].div.id.slice(4)) + 1);

};