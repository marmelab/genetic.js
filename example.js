var sequencer = require('./src/model/sequencer');
var population = require('./src/model/population');
var individual = require('./src/model/individual');

var selectionWheel = require('./src/callback/selection/wheelSelection');
var dumbMutate = require('./src/callback/mutate/dumbMutate');
var dumbRecombine = require('./src/callback/recombine/dumbRecombine');


 var distances = [
    [-1, 3, 2, -1, 5, -1],
    [3, -1, -1, 6, 4, -1],
    [2, -1, -1, -1, -1, 2],
    [-1, 6, -1, -1, 1, 2],
    [5, 4, -1, 1, -1, -1],
    [-1, -1, 2, 2, -1, -1]
];

var fitnessCallback = function(data) {
    var totalDistance = 0;

    for (var i = 1; i < data.length; i++) {
        if (data.hasOwnProperty(i)) {
            if (distances[i][i-1] === -1) {
                return 0.0000001
            }

            totalDistance += distances[i][i-1]
        }
    }

    return 1/totalDistance;
}

var routesPopulation = population(selectionWheel).data([
    individual(dumbMutate, fitnessCallback).data([1, 2, 4, 6, 3, 1]),
    individual(dumbMutate, fitnessCallback).data([2, 1, 3, 6, 4, 5])
]);

var seq = sequencer(routesPopulation);
seq.recombineCallback(dumbRecombine);

seq.run(10);
