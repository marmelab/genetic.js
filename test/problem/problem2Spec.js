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


            var distances = [
                [-1, 5, 7, 3, 5],
                [5, -1, -1, -1, 9],
                [7, -1, -1, 2, -1],
                [3, -1, 2, -1, 1]
            ];

            pool.fitness(function(data) {
                var fitness = 0;
                var lastCity = parseInt(data[0].join(''), 2);
                var found = [];

                for (var i in data) {
                    if (data.hasOwnProperty(i)) {
                        var nextCity = parseInt(data[i].join(''), 2);
                        // if(distances[lastCity][nextCity] === -1 || found.indexOf(nextCity) !== -1) {
                        //     return 1/999999999999999999;
                        // }
                        found.push(nextCity);
                        lastCity = nextCity;
                        fitness *= distances[lastCity][nextCity];

                        if (fitness <= 0) {
                            return fitness-1;
                        }
                    }
                }

                return 1/fitness;
            });

            pool
                .data([
                    [0, 0], // 0
                    [0, 1], // 1
                    [1, 0], // 2
                    [1, 1], // 3
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

            if (result.evaluate() > 0) {
                console.log('Solution trouvée', result.evaluate());
            }
        });
    });
});
