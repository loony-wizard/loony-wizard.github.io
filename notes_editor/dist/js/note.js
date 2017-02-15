'use strict';

/**
 * author: Vladimir
 * created: 9.11.2016
 * modified: 13.11.2016
 *
 * In this I describe class Note and methods to work with notes
 */

/* just an array with all notes on the page, really usefull */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var notes = [];

var Note = function () {
	function Note(div, tags) {
		_classCallCheck(this, Note);

		this.div = div;
		if (tags === undefined) {
			this.tags = [];
		} else {
			this.tags = tags;
		}
	}

	_createClass(Note, [{
		key: 'delete',
		value: function _delete() {

			// TODO: add ask before deleting dialog

			// delete html element
			this.div.parentElement.removeChild(this.div);

			// delete note from array notes
			var index = notes.indexOf(this);
			notes.splice(index, 1);

			// delete note from localStorage
			this.deleteFromLocalStorage();
		}
	}], [{
		key: 'createNote',
		value: function createNote() {

			var div = document.createElement('div');
			div.className = 'note col-lg-4 col-sm-6';
			div.id = this.prototype.idForNewNote();

			var deleteNoteWrapper = document.createElement('div');
			deleteNoteWrapper.className = 'delete_note_wrapper';
			var deleteNoteImage = document.createElement('img');
			deleteNoteImage.src = './images/cross.png';
			deleteNoteWrapper.appendChild(deleteNoteImage);
			div.appendChild(deleteNoteWrapper);

			var textarea = document.createElement('textarea');
			textarea.className = 'input';
			div.appendChild(textarea);
			// let inputDiv = document.createElement('div');
			// inputDiv.className = 'input';
			// inputDiv.setAttribute('contenteditable', 'true');
			// div.appendChild(inputDiv);

			var tagsDiv = document.createElement('div');
			tagsDiv.className = 'tags';
			var p = document.createElement('p');
			p.innerHTML = 'This note hasn\'t got any tags yet.';
			tagsDiv.appendChild(p);
			div.appendChild(tagsDiv);

			var note = new Note(div);

			notes.push(note);

			note.putToPage();
			note.saveToLocalStorage();
			note.saveNotesIdentificatorsToLocalStorage();
			note.setHandlers();

			return note;
		}
	}, {
		key: 'loadNotesFromLocalStorage',
		value: function loadNotesFromLocalStorage() {

			// get array with identificators
			var data = localStorage.getItem('notesIdentificators');

			if (data === null) return; /* this is the first start */

			var identificators = JSON.parse(data);

			// load every note
			for (var i = 0; i < identificators.length; i++) {

				var json = localStorage.getItem(identificators[i]);
				var _data = JSON.parse(json);
				var tmp = document.createElement('div');
				tmp.innerHTML = _data['div'];
				var div = tmp.firstChild;
				div.getElementsByClassName('input')[0].value = _data['note'];
				var tags = JSON.parse(_data['tags']);

				var note = new Note(div, tags);
				note.putToPage();
				note.setHandlers();
				notes.push(note);
			}
		}
	}]);

	return Note;
}();

;

Note.prototype.putToPage = function () {

	var countOfNotes = document.getElementsByClassName('note');

	if (countOfNotes === 0) {
		document.getElementById('notes').appendChild(this.div);
	} else {
		document.getElementById('notes').insertBefore(this.div, document.getElementsByClassName('note')[0]);
	}
};

Note.prototype.setHandlers = function () {
	var _this = this;

	var typingHandler = function typingHandler() {

		new Promise(function (resolve, reject) {

			// parse text and find all tags
			var input = _this.div.getElementsByClassName('input')[0];
			var tags = searchTags(input.value);
			resolve(tags);
		}).then(function (tags) {

			_this.tags = tags;
			var tagsDiv = _this.div.getElementsByClassName('tags')[0];

			if (tags.length > 0) {

				tagsDiv.innerHTML = '';

				// create html elements for tags
				tags.forEach(function (tag, i, tags) {

					var div = document.createElement('div');
					div.className = 'tag';
					div.innerHTML = tag;
					tagsDiv.appendChild(div);
				});
			} else {

				tagsDiv.innerHTML = '<p>This note hasn\'t got any tags yet.</p>';
			}
		});

		_this.saveToLocalStorage();
	};

	var deletingHandler = function deletingHandler() {
		_this.delete();
	};

	var events = ['keyup', 'onpaste', 'oncopy', 'oncut', 'input'];
	for (var i = 0; i < events.length; i++) {
		this.div.addEventListener(events[i], typingHandler, false);
	}

	this.div.getElementsByTagName('img')[0].onclick = deletingHandler;
};

Note.prototype.saveToLocalStorage = function () {

	var data = {};
	data['div'] = this.div.outerHTML;
	data['note'] = this.div.getElementsByClassName('input')[0].value;
	data['tags'] = JSON.stringify(this.tags);
	var json = JSON.stringify(data);
	localStorage.setItem(this.div.id, json);
};

Note.prototype.deleteFromLocalStorage = function () {

	// delete identificator
	var json = localStorage.getItem('notesIdentificators');
	var identificators = JSON.parse(json);

	var index = identificators.indexOf(this.div.id);
	identificators.splice(index, 1);

	localStorage.removeItem(this.div.id);
	localStorage.setItem('notesIdentificators', JSON.stringify(identificators));
};

Note.prototype.saveNotesIdentificatorsToLocalStorage = function () {

	var data = [];
	for (var i = 0; i < notes.length; i++) {
		data.push(notes[i].div.id);
	}
	var json = JSON.stringify(data);
	localStorage.setItem('notesIdentificators', json);
};

Note.prototype.idForNewNote = function () {

	if (notes.length === 0) return 'note0';

	// get XXX numbers in 'noteXXX'
	// (*) XXX sequence begins from 4th symbol in 'noteXXX'

	return 'note' + (parseInt(notes[notes.length - 1].div.id.slice(4)) + 1);
};