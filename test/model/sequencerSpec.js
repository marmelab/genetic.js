/*global describe,it,expect,beforeEach,jasmine,spyOn*/

define(function(require) {
    "use strict";

    var pool,
        sequencer,
        selectionCallback,
        crossoverCallback,
        mutationCallback,
        fitnessCallback;

    describe('Sequencer', function() {
        beforeEach(function() {
            pool = require('model/pool')();
            sequencer = require('model/sequencer')(pool);
            sequencer.mergeCallback(function(data1, data2) {
                return data2;
            });

            pool.data(['Gaston', 'Lagaffe']);

            var i = 1;

            selectionCallback = jasmine.createSpy('selectionCallback').andReturn(['Gaston']);
            crossoverCallback = jasmine.createSpy('crossoverCallback').andReturn(['Gaston', 'Gasjkze']);
            mutationCallback = jasmine.createSpy('mutationCallback').andReturn(['Goston', 'Gasjkze']);
            fitnessCallback = jasmine.createSpy('fitnessCallback').andCallFake(function(data) {
                if (i > 0) {
                    return i--;
                }

                return i;
            });

            pool
                .selection(selectionCallback)
                .crossover(crossoverCallback)
                .mutation(mutationCallback)
                .fitness(fitnessCallback)
            ;

            spyOn(sequencer, 'step').andCallThrough();
        });

        it('should run all steps according to the delta', function() {
            sequencer.run(0.5); // It should run only 3 steps
            expect(sequencer.step.calls.length).toBe(3);

            sequencer.step.reset();

            sequencer.run(0.25); // It should run only 5 steps
            expect(sequencer.step.calls.length).toBe(4);

            sequencer.step.reset();

            sequencer.run(0.125); // It should run only 15 steps
            expect(sequencer.step.calls.length).toBe(8);
        });

        it('should run all steps with success', function() {
            sequencer.step();

            expect(selectionCallback).toHaveBeenCalledWith(['Gaston', 'Lagaffe']);
            expect(crossoverCallback).toHaveBeenCalledWith(['Gaston']);
            expect(mutationCallback).toHaveBeenCalledWith(['Gaston', 'Gasjkze']);
            expect(fitnessCallback).toHaveBeenCalledWith(sequencer.pool().data());

            var currentPool = sequencer.pool();

            expect(sequencer.pool().data()).toEqual(['Goston', 'Gasjkze']);

            sequencer.step();

            expect(selectionCallback).toHaveBeenCalledWith(['Goston', 'Gasjkze']);
            expect(crossoverCallback).toHaveBeenCalledWith(['Gaston']);
            expect(mutationCallback).toHaveBeenCalledWith(['Gaston', 'Gasjkze']);
            expect(fitnessCallback).toHaveBeenCalledWith(sequencer.pool().data());
            expect(sequencer.pool()).toBe(currentPool);
        });
    });
});
