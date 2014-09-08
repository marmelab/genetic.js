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

    var bestFitness = 0,
        stepCount = 1;

    var model = {
        step: function() {
            var couple = config.population.selection();
            stepCount++;
            couple.recombineCallback(config.recombineCallback);
            var child = couple.recombine();
            // console.log('new child born');


            if (config.randomizer() < config.pM) {
                child.mutate();
            }

            if (child.fitness() !== -1) {
                config.population = config.population.add(child).eliminate();
                // console.log('updating population');
            }
        },
        run: function(delta) {
            console.log('delta', delta);
            var count = 0;

            do {
                model.step();
                if (config.population.bestFitness() === bestFitness) {
                    count++;
                } else {
                    count = 0;
                    var percent = config.population.bestFitness()*100/bestFitness;

                    bestFitness = config.population.bestFitness();
                    console.log('step ' + stepCount + ', fitness: ' + bestFitness, ', +' + (percent-100) + '%');
                }
            } while(count < delta);


            return config.population;
        }
    };

    configurable(model, config);

    return model;
};
