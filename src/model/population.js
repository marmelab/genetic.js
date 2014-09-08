/**
 * A population represents a population of individuals
 * population.data([...]).mutate()
 */
"use strict";

var configurable = require('../util/configurable');
var random = require('../util/random');

module.exports = function population (selectionCallback) {
    /**
     * @mixin
     */
    var config = {
        data: [], // all its individuals
        selectionCallback: selectionCallback,
    };

    var model = {
        /**
         * Find two individuals in the population
         * @return {couple}
         */
        selection: function() {
            return config.selectionCallback(config.data);
        },

        add: function(individual) {
            var newPopulation = population(config.selectionCallback)
            var data = config.data;
            data.push(individual);
            return newPopulation.data(data);
        },


        eliminate: function() {
            var data = config.data,
                worstFitness = null,
                worstI;

            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    if (!worstFitness || data[i].fitness() < worstFitness) {
                        worstFitness = data[i].fitness();
                        worstI = i;
                    }
                }
            }

            data.splice(worstI, 1);

            return population(config.selectionCallback).data(data);
        },

        bestFitness: function() {
           var data = config.data,
               bestFitness = null
            ;

            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    if (!bestFitness || data[i].fitness() > bestFitness) {
                        bestFitness = data[i].fitness();
                    }
                }
            }

            return bestFitness;
        }
    };

    configurable(model, config);

    return model;
};
