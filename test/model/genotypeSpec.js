/*global describe,it,expect,beforeEach,jasmine*/

define(function(require) {
    "use strict";

    var genotype,
        gene1,
        gene2;

    describe('Genotype', function() {
        beforeEach(function() {
            genotype = require('model/genotype')();
            genotype.pM(1);
            gene1 = {
                data: jasmine.createSpy('data').andReturn('Gaston'),
                mutate: jasmine.createSpy('mutate').andCallFake(function(data) {
                    return {
                        data: jasmine.createSpy('data').andReturn('Goston')
                    };
                })
            };
            gene2 = {
                data: jasmine.createSpy('data').andReturn('Lagaffe'),
                mutate: jasmine.createSpy('mutate').andCallFake(function(data) {
                    return {
                        data: jasmine.createSpy('data').andReturn('Logaffe')
                    };
                })
            };
            genotype.data([
                gene1,
                gene2
            ]);
        });

        it('should return data of the genotype when data() is called', function() {
            expect(genotype.data()).toEqual([gene1, gene2]);
        });

        it('should return a new sub genotype after calling the selection callback when sub() is called', function() {
            var subCallback = jasmine.createSpy('subCallback').andReturn([gene1]);
            genotype.subCallback(subCallback);

            // The sub callback should not be called yet
            expect(genotype.data()).toEqual([gene1, gene2]);
            expect(subCallback).not.toHaveBeenCalled();

            var newGenotype = genotype.sub();
            expect(subCallback).toHaveBeenCalledWith(genotype.data());
            expect(newGenotype.data()).toEqual([gene1]);
        });

        it('should return a new mutated genotype after calling the mutate callback on each gene when mutate() is called', function() {
            // The mutate callback should not be called yet
            expect(genotype.data()).toEqual([gene1, gene2]);
            expect(gene1.mutate).not.toHaveBeenCalled();
            expect(gene2.mutate).not.toHaveBeenCalled();

            var newGenotype = genotype.mutate();

            expect(gene1.mutate).toHaveBeenCalled();
            expect(gene2.mutate).toHaveBeenCalled();
            expect(newGenotype.data()[0].data()).toBe('Goston');
            expect(newGenotype.data()[1].data()).toBe('Logaffe');
        });

        // it('should return the fitness of the genotype after calling the fitness callback when evaluate() is called', function() {
        //     var fitnessCallback = jasmine.createSpy('fitnessCallback').andReturn(0.4);
        //     genotype.fitness(fitnessCallback);

        //     // The fitness callback should not be called yet
        //     expect(fitnessCallback).not.toHaveBeenCalled();

        //     expect(genotype.evaluate()).toBe(0.4);
        //     expect(fitnessCallback).toHaveBeenCalledWith(genotype.data());
        // });

        // it('should keep its genotype parent configuration', function() {
        //     var mutateCallback = jasmine.createSpy('mutateCallback').andReturn(['Lagaffe']);
        //     genotype.mutation(mutateCallback);

        //     expect(genotype.mutate().mutation()).toBe(mutateCallback);
        // });

        // it('should return a new recombined genotype after calling the crossover callback when recombined() is called', function() {
        //     var crossoverCallback = jasmine.createSpy('crossoverCallback').andReturn(['Gaston', 'Lagaffe', 'Tongaffe', 'GasGaffe']);
        //     genotype.crossover(crossoverCallback);

        //     // The mutate callback should not be called yet
        //     expect(genotype.data()).toEqual(['Gaston', 'Lagaffe']);
        //     expect(crossoverCallback).not.toHaveBeenCalled();

        //     var newPool = genotype.recombine();

        //     expect(crossoverCallback).toHaveBeenCalledWith(genotype.data());
        //     expect(newPool.data()).toEqual(['Gaston', 'Lagaffe', 'Tongaffe', 'GasGaffe']);
        // });
    });
});
