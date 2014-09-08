"use strict";

var random = require('../../util/random');
var couple = require('../../model/couple');
var dumbRecombine = require('../../callback/recombine/dumbRecombine');

module.exports = function wheelSelection(data) {
    var sum = 0,
        wheel = [],
        min = 0
    ;

    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            sum += data[i].fitness();
        }
    }

    for (var j in data) {
        if (data.hasOwnProperty(j)) {
            wheel[j] = {
                min: min,
                max: min + (data[j].fitness() / sum) * 360
            }

            min = wheel[j].max;
        }
    }

    var rand = random(0, 360),
        best = data[0];

    for (var k in wheel) {
        if (rand >= wheel[k].min && rand < wheel[k].max) {
            best = data[k];
            data.splice(k, 1);
        }
    }

    return couple(
        best,
        data[random(0, data.length - 1)]
    ).recombineCallback(dumbRecombine);
};
