"use strict";

var random = require('../../util/random');
var couple = require('../../model/couple');

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
                max: (data[j].fitness() / sum) * 360
            }

            min = wheel[j].max;
        }
    }

    console.log(wheel);
    var rand = random(0, 360),
        best = null

    for (var k in wheel) {
        if (rand >= wheel[k].min && rand < wheel[k].max) {
            best = data.splice(k, 1);
        }
    }

    console.log('best', best);
    console.log('best2', data[random(0, data.length -1)]);
    return couple(
        best,
        data[random(0, data.length -1)]
    );
};
