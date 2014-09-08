/**
 * A individual represents an individual
 */

"use strict";

var configurable = require('../util/configurable');

module.exports = function individual (mutateCallback, fitnessCallback) {
        /**
     * @mixin
     */
    var config = {
        data: [],
        mutateCallback: mutateCallback,
        fitnessCallback: fitnessCallback
    };

    var model = {
        mutate: function() {
            return individual(config.mutateCallback, config.fitnessCallback).data(config.mutateCallback(config.data));
        },

        fitness: function() {
            return config.fitnessCallback(config.data);
        }
    };

    configurable(model, config);

    return model;
};
