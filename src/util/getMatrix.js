"use strict";

var parse = require('csv-parse');
var fs = require('fs');

function toRad(deg) {
  return deg * Math.PI / 180;
}

var getDistance = function (location1, location2) {

  var result = Math.sqrt(Math.pow(location1.x - location2.x, 2) + Math.pow(location1.y - location2.y, 2));

  return result;
}

var fromOrigin = function (origin) {
  return function (location) {
    return getDistance(origin, location);
  }
}

var getLocations = function (callback) {
  fs.readFile('./src/resources/locations.csv', function (error, data) {
    parse(data, {}, function(err, data){
      var locations = [];
      for (var i = 0; i < data.length; i++) {
        locations.push({
          name: data[i][0],
          x: data[i][1],
          y: data[i][2],
        });
      }
      callback(err, locations);
    });
  });
};

var getMatrix = function (callback) {
  getLocations(function(err, locations){
    var matrix = [];
    for (var i = 0; i < locations.length; i++) {
      var origin = locations[i];
      matrix[i] = [];
      var distanceTo = fromOrigin(locations[i]);
      for (var j = 0; j < locations.length; j++) {
        var destination = locations[j];
        if (i === j) {
          matrix[i][j] = -1;
          continue;
        }

        matrix[i][j] = distanceTo(destination);
      }
    }

    return callback(null, matrix);
  });
};

module.exports = getMatrix;
