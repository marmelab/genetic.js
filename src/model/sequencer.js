/**
 * A sequencer execute a genetic computation
 */

"use strict";

var configurable = require('../util/configurable');
var population = require('./population');
var random = require('../util/random');

module.exports = function sequencer (population) {
    /**
     * @mixin
     */
    var config = {
        population: population,
        pM: 0.1,
        randomizer: random,
        recombineCallback: null
    };

    var bestFitness = 0;

    var model = {
        step: function() {
            var couple = config.population.selection();

            couple.recombineCallback(config.recombineCallback);
            var child = couple.recombine();


            if (config.randomizer() < config.pM) {
                child.mutate();
            }

            if (child.fitness() !== -1) {
                config.population = config.population.add(child).eliminate();
            }
        },
        run: function(delta) {
            var count = 0;

            do {
                model.step();

                count++;
                if (config.population.bestFitness() === bestFitness) {

                } else {
                    count = 0;
                    bestFitness = config.population.bestFitness();
                }
            } while(count < delta);


            return config.population;
        }
    };

    configurable(model, config);

    return model;
};
