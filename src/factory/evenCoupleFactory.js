/**
 * A coupleFactory produce couple from a genotype
 */
define(function(require) {
    "use strict";

    var configurable = require('../util/configurable');
    var random = require('../util/random');
    var couple = require('../model/couple');

    return function coupleFactory () {
        /**
         * @mixin
         */
        var config = {
            data: [],
            randomizer: random,
            coupleModel: couple
        };

        function factory (data) {
            // Let's create the couples
            var couples = [];

            var temp = [].concat(data);
            while (temp.length > 0) {
                var c1 = config.randomizer(0, temp.length - 1),
                    c2 = c1;

                do {
                    c2 = config.randomizer(0, temp.length - 1);
                } while (c2 === c1);

                couples.push(config.coupleModel(temp[c1], temp[c2]));

                temp.splice(c1, 1);

                if (c1 < c2) {
                    temp.splice(c2 - 1, 1);
                } else {
                    temp.splice(c2, 1);
                }
            }

            return couples;
        }

        configurable(factory, config);

        return factory;
    };
});
