/*global describe,it,expect,beforeEach,jasmine*/

define(function(require) {
    "use strict";

    var pool,
        dumbCrossover,
        dumbMutation,
        dumbSelector,
        sequencer;

    describe('Problem', function() {
        beforeEach(function() {
            pool = require('model/pool')();
            dumbCrossover = require('crossover/dumbCrossover')();
            dumbMutation = require('mutation/dumbMutation')();
            dumbSelector = require('selector/dumbSelector');

            dumbCrossover.probability(0.1);
            dumbMutation.probability(0.001);

            pool.fitness(function(data) {
                var fitness = 0;

                for (var i in data) {
                    if (data.hasOwnProperty(i)) {
                        fitness += parseInt(data[i].join(''), 2);
                    }
                }

                return fitness;
            });

            pool
                .data([
                    [0, 1, 0, 1, 1],
                    [1, 0, 0, 1, 1],
                    [0, 0, 1, 0, 1],
                    [1, 1, 0, 0, 0]
                ])
                .crossover(dumbCrossover)
                .mutation(dumbMutation)
                .selection(dumbSelector)
            ;

            sequencer = require('model/sequencer')(pool);
            sequencer.mergeCallback(function(data1, data2) {
                var result = [];

                for (var i in data1) {
                    if (data1.hasOwnProperty(i)) {
                        if (Math.random() < 0.2) {
                            result.push(data2[i]);
                        } else {
                            result.push(data1[i]);
                        }
                    }
                }

                return result;
            });
        });

        it('solve the problem', function() {
            console.log(pool.data().map(function(i) {
                return parseInt(i.join(''), 2);
            }));

            var result = sequencer.run(0.00005);

            console.log(result.data().map(function(i) {
                return parseInt(i.join(''), 2);
            }));
            console.log(result.evaluate());
        });
    });
});
