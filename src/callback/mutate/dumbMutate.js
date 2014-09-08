
"use strict";

var configurable = require('../../util/configurable'),
    random = require('../../util/random');

module.exports = function() {
    /**
     * @mixin
     */
    var config = {
        randomizer: random
    };

    function dumbMutate(data) {
        var result = [].concat(data);
        var index = config.randomizer(0, result.length - 1);
        result[index] = !result[index] ? 1 : 0;

        return result;
    }

    configurable(dumbMutate, config);

    return dumbMutate;
};
