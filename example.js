var sequencer = require('./src/model/sequencer');
var population = require('./src/model/population');
var individual = require('./src/model/individual');

var selectionWheel = require('./src/callback/selection/wheelSelection');
var dumbMutate = require('./src/callback/mutate/dumbMutate');
var dumbRecombine = require('./src/callback/recombine/dumbRecombine');


 var distances = [
    [-1, 3, 4, 2, 1, 6],
    [3, -1, 6, 8, 1, 3],
    [4, 5, -1, 7, 2, 1],
    [1, 1, 2, -1, 4, 3],
    [3, 1, 4, 5, -1, 7],
    [4, 5, 3, 1, 4, -1]
];

var fitnessCallback = function(data) {
    var totalDistance = 0;

    for (var i = 1; i < data.length; i++) {
        if (data.hasOwnProperty(i)) {
            if (distances[data[i-1] - 1][data[i] - 1] === -1) {
                return -1;
            }

            totalDistance += distances[data[i-1] - 1][data[i] - 1];
        }
    }

    return 1/totalDistance;
}

var routesPopulation = population(selectionWheel).data([
    individual(dumbMutate, fitnessCallback).data([1, 2, 4, 3, 5, 6]),
    individual(dumbMutate, fitnessCallback).data([6, 5, 4, 3, 1, 2])
]);

console.log('BEFORE');
console.log(routesPopulation.best().data(), 1/routesPopulation.best().fitness());
console.log(routesPopulation.data().map(function(individual) {
    return individual.data();
}));

var seq = sequencer(routesPopulation);
seq.recombineCallback(dumbRecombine);

var routesPopulation2 = seq.run(20000);

console.log('AFTER');
console.log(routesPopulation2.best().data(), 1/routesPopulation2.best().fitness());
console.log(routesPopulation2.data().map(function(individual) {
    return individual.data();
}));

