"use strict";

var random = require('./random');
var getVoyager = function getVoyager (length) {
  var indexes = [];
  var result = [];

  for (var i=0; i<length; i++) {
    indexes.push(i+1);
  }

  while (result.length < length) {
    result.push(indexes.splice(random(0, indexes.length - 1), 1)[0]);
  }
  return result;
};

// console.log(getVoyager(38));

module.exports = getVoyager;
