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
            probability: 0.1
        };

        function dumbCrossover(data) {
            var result = [].concat(data);

            // Let's create the couples
            var couples = [];

            var temp = [].concat(data);
            while (temp.length > 0) {
                var c1 = config.randomizer(0, temp.length - 1),
                    c2 = c1;

                do {
                    c2 = config.randomizer(0, temp.length - 1);
                } while (c2 === c1);

                couples.push([
                    temp[c1],
                    temp[c2]
                ]);

                temp.splice(c1, 1);

                if (c1 < c2) {
                    temp.splice(c2 - 1, 1);
                } else {
                    temp.splice(c2, 1);
                }
            }


            for (var i in couples) {
                if (couples.hasOwnProperty(i)) {
                    var cutOffset = random(1, couples[i][0].length - 1);

                    if (config.randomizer() < config.probability) {
                        result.push(couples[i][0]
                            .slice(0, cutOffset)
                            .concat(
                                couples[i][1]
                                    .slice(cutOffset)
                            )
                        );
                    } else {
                        result.push(couples[i][0]);
                    }

                    if (config.randomizer() < config.probability) {
                        result.push(couples[i][1]
                            .slice(0, cutOffset)
                            .concat(
                                couples[i][0]
                                    .slice(cutOffset)
                            )
                        );
                    } else {
                        result.push(couples[i][1]);
                    }
                }
            }

            return result;
        }

        configurable(dumbCrossover, config);

        return dumbCrossover;
    };
});
