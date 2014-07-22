/**
 * A pool represents a population of individuals
 * pool.data([...]).mutate()
 */
define(function(require) {
    "use strict";

    var configurable = require('../util/configurable');

    return function pool (poolParent) {
        /**
         * @mixin
         */
        var config = {
            data: [],
            selection: null,
            mutation: null,
            fitness: null,
            crossover: null,
        };

        if (poolParent) {
            config.selection = poolParent.selection();
            config.mutation = poolParent.mutation();
            config.fitness = poolParent.fitness();
            config.crossover = poolParent.crossover();
        }

        function clone (obj) {
            return JSON.parse(JSON.stringify(obj));
        }

        var model = {
            sub: function() {
                return pool(model).data(config.selection(config.data));
            },
            mutate: function() {
                return pool(model).data(config.mutation(config.data));
            },
            evaluate: function() {
                return config.fitness(config.data);
            },
            recombine: function() {
                return pool(model).data(config.crossover(config.data));
            }
        };

        configurable(model, config);

        return model;
    };
});
