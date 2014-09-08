"use strict";

var parse = require('csv-parse');
var fs = require('fs');

function toRad(deg) {
  return deg * Math.PI / 180;
}

var getDistance = function (location1, location2) {

  var result = Math.sqrt(Math.pow(location1.x - location2.x, 2) + Math.pow(location1.y - location2.y, 2));

  if (result !== result) {
    console.log(location1, location2);
    throw new Error('cannot compute distance');
  }

  return result;
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
    console.log('data imported');
    var matrix = [];
    for (var i = 0; i < locations.length; i++) {
      matrix[i] = [];
      for (var j = 0; j < locations.length; j++) {
        if (i === j) {
          matrix[i][j] = -1;
          continue;
        }

        matrix[i][j] = getDistance(locations[i], locations[j]);

        // if (!matrix[j]) {
        //   matrix[j] =  [];
        // }

        // matrix[j][i] = matrix[i][j];
      }
    }
    console.log('matrix generated');
    return callback(null, matrix);
  });
};

module.exports = getMatrix;
