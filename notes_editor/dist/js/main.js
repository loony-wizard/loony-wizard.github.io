'use strict';

/**
 * author: Vladimir
 * created: 9.11.2016
 * modified: 13.11.2016
 *
 * This is the main .js file in web application
 */

window.onload = function () {

  Note.loadNotesFromLocalStorage();

  document.getElementById('addNote').onclick = function () {
    Note.createNote();
  };

  setSearchHandler();
};