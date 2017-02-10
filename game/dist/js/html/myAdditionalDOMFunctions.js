'use strict';

function addClass(element, className) {
  /**
  * This function adds new class to the HTML element
  */
  var classes = element.className.split(' ');
  if (classes.indexOf(className) === -1) {
    if (element.className.length === 0) {
      element.className = className;
    } else {
      element.className += ' ' + className;
    }
  }
}

function removeClass(element, className) {
  /**
  * This function removes new class from the HTML element
  */
  var oldClassList = element.className.split(' '),
      newClassList = '';
  oldClassList.forEach(function (item, i) {
    if (item != className) {
      if (i == 0) newClassList = item;else newClassList += ' ' + item;
    }
  });
  element.className = newClassList;
}