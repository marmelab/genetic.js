
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
        var index1 = config.randomizer(0, result.length - 1);
        var index2= config.randomizer(0, result.length - 1);

        var temp = result[index1];
        result[index1] = result[index2];
        result[index2] = temp;

        return result;
    }

    configurable(dumbMutate, config);

    return dumbMutate;
}();
