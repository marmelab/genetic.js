/*global describe,it,expect,beforeEach,jasmine*/

define(function(require) {
    "use strict";

    var pool;

    describe('Pool', function() {
        beforeEach(function() {
            pool = require('model/pool')();
            pool.data(['Gaston', 'Lagaffe']);
        });

        it('should set data of the pool when data(array) is called', function() {
            expect(pool.data()).toEqual(['Gaston', 'Lagaffe']);
        });

        it('should return a new sub pool after calling the selection callback when sub() is called', function() {
            var selectionCallback = jasmine.createSpy('selectionCallback').andReturn(['Gaston']);
            pool.selection(selectionCallback);

            // The mutate callback should not be called yet
            expect(pool.data()).toEqual(['Gaston', 'Lagaffe']);
            expect(selectionCallback).not.toHaveBeenCalled();

            var newPool = pool.sub();
            expect(selectionCallback).toHaveBeenCalledWith(pool.data());
            expect(newPool.data()).toEqual(['Gaston']);
        });

        it('should return a new mutated pool after calling the mutatation callback when mutate() is called', function() {
            var mutateCallback = jasmine.createSpy('mutateCallback').andReturn(['Lagaffe']);
            pool.mutation(mutateCallback);

            // The mutate callback should not be called yet
            expect(pool.data()).toEqual(['Gaston', 'Lagaffe']);
            expect(mutateCallback).not.toHaveBeenCalled();

            var newPool = pool.mutate();

            expect(mutateCallback).toHaveBeenCalledWith(pool.data());
            expect(newPool.data()).toEqual(['Lagaffe']);
        });

        it('should return the fitness of the pool after calling the fitness callback when evaluate() is called', function() {
            var fitnessCallback = jasmine.createSpy('fitnessCallback').andReturn(0.4);
            pool.fitness(fitnessCallback);

            // The fitness callback should not be called yet
            expect(fitnessCallback).not.toHaveBeenCalled();

            expect(pool.evaluate()).toBe(0.4);
            expect(fitnessCallback).toHaveBeenCalledWith(pool.data());
        });

        it('should keep its pool parent configuration', function() {
            var mutateCallback = jasmine.createSpy('mutateCallback').andReturn(['Lagaffe']);
            pool.mutation(mutateCallback);

            expect(pool.mutate().mutation()).toBe(mutateCallback);
        });

        it('should return a new recombined pool after calling the crossover callback when recombined() is called', function() {
            var crossoverCallback = jasmine.createSpy('crossoverCallback').andReturn(['Gaston', 'Lagaffe', 'Tongaffe', 'GasGaffe']);
            pool.crossover(crossoverCallback);

            // The mutate callback should not be called yet
            expect(pool.data()).toEqual(['Gaston', 'Lagaffe']);
            expect(crossoverCallback).not.toHaveBeenCalled();

            var newPool = pool.recombine();

            expect(crossoverCallback).toHaveBeenCalledWith(pool.data());
            expect(newPool.data()).toEqual(['Gaston', 'Lagaffe', 'Tongaffe', 'GasGaffe']);
        });
    });
});
