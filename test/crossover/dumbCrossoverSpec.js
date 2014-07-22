/*global describe,it,expect,beforeEach,jasmine*/

define(function(require) {
    "use strict";

    var dumbCrossover;

    describe('DumbCrossover', function() {
        beforeEach(function() {
            dumbCrossover = require('crossover/dumbCrossover')();

            var i = 0,
                distribution = [0, 1, 1];

            dumbCrossover.randomizer(function(min, max) {
                if (![].slice.apply(arguments).length) {
                    return 0.09;
                }

                return distribution[i++];
            });
        });

        it('should create children', function() {
            var result = dumbCrossover([[1, 3], [2, 4]]);

            expect(result.length).toBe(4);
            expect(result[0]).toEqual([1, 3]);
            expect(result[1]).toEqual([2, 4]);
            expect(result[2]).toEqual([1, 4]);
            expect(result[3]).toEqual([2, 3]);
        });
    });
});
