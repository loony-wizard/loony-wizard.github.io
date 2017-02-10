'use strict';

/**
 * author: Vladimir
 * created: 10.11.2016
 * modified: 11.11.2016
 *
 * This is a function, which can search tags in string
 */

function searchTags(string) {

  var tags = [];
  var regexp = /[!,\.;\(\)\[\]{}\n\r\t ]/gi;

  var set = new Set(string.split(regexp));

  set.forEach(function (value, i, set) {

    var regexp = /#/;

    if (regexp.test(value)) {

      var position = value.search(regexp);
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