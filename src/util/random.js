
"use strict";


var Chance = require('chance');

var chance = new Chance();

module.exports = function random(min, max) {
    if (![].slice.apply(arguments).length) {
        return chance.floating({min: 0, max: 1, fixed: 8});
    }

    return chance.integer({min: min, max: max});
};
