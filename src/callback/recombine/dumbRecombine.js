
"use strict";

var configurable = require('../../util/configurable'),
    random = require('../../util/random'),
    couple = require('../../model/couple');

module.exports = function() {
    /**
     * @mixin
     */
    var config = {
        randomizer: random
    };

    function dumbRecombine(left, right, cutCount) {
        var resultCouple = couple();
        var cutOffset = random(1,left.length - 1);

        var child = left.slice(0, cutOffset);
        var i = cutOffset + 1;

        while (child.length < left.length) {
            if (child.indexOf(right[i]) === -1) {
                child.push(right[i]);
            }

            i = (i+1)%(right.length);
        }

        return child;
    }

    configurable(dumbRecombine, config);

    return dumbRecombine;
};