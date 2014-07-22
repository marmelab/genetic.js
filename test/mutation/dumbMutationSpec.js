/*global describe,it,expect,beforeEach,jasmine*/

define(function(require) {
    "use strict";

    var dumbMutation;

    describe('DumbMutation', function() {
        beforeEach(function() {
            dumbMutation = require('mutation/dumbMutation')();

            var i = 0,
                distribution = [0, 1, 1, 0];

            dumbMutation.randomizer(function(min, max) {
                return distribution[i++];
            });
        });

        it('should create children', function() {
            var result = dumbMutation([[0, 1], [1, 1]]);

            expect(result[0]).toEqual([1, 1]);
            expect(result[1]).toEqual([1, 0]);
        });
    });
});
