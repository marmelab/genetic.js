/**
 * A couple represents two individual
 */

"use strict";

var configurable = require('../util/configurable');
var individual = require('../model/individual');

module.exports = function couple (left, right) {
    /**
     * @mixin
     */
    var config = {
        left: left,
        right: right,
        cutCount: 1,
        recombineCallback: null
    };

    var model = {
        recombine: function() {
            return individual(
                config.left.mutateCallback(),
                config.left.fitnessCallback()
            ).data(
                config.recombineCallback(config.left.data(), config.right.data(), config.cutCount)
            );
        }
    };

    configurable(model, config);

    return model;
};
