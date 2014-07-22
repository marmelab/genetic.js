define(function(require) {
    "use strict";

    var configurable = require('../util/configurable'),
        random = require('../util/random');

    return function() {
        /**
         * @mixin
         */
        var config = {
            randomizer: random,
            probability: 0.01
        };

        function dumbMutation(data) {
            var result = [].concat(data);

            for (var i in result) {
                if (result.hasOwnProperty(i)) {
                    for (var j in result[i]) {
                        if (config.randomizer() < config.probability) {
                            result[i][j] = !result[i][j] ? 1 : 0;
                        }
                    }
                }
            }

            return result;
        }

        configurable(dumbMutation, config);

        return dumbMutation;
    };
});
