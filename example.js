var sequencer = require('./src/model/sequencer');
var population = require('./src/model/population');
var individual = require('./src/model/individual');

var selectionWheel = require('./src/callback/selection/wheelSelection');
var dumbMutate = require('./src/callback/mutate/dumbMutate');
var dumbRecombine = require('./src/callback/recombine/dumbRecombine');
var getMatrix = require('./src/util/getMatrix');
var getVoyager = require('./src/util/getVoyager');

getMatrix(function(err, distances) {

//  var distances = [
//     [-1, 3, 4, 2, 1, 6],
//     [3, -1, 6, 8, 1, 3],
//     [4, 5, -1, 7, 2, 1],
//     [1, 1, 2, -1, 4, 3],
//     [3, 1, 4, 5, -1, 7],
//     [4, 5, 3, 1, 4, -1]
// ];

var fitnessCallback = function(data) {
    var totalDistance = 0;
    // console.log(data);
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
// console.log(getVoyager(distances.length));
var routesPopulation = population(selectionWheel).data((function () {
    var individuals = []
    for (var i =0; i < 50; i++)  {
        individuals.push(individual(dumbMutate, fitnessCallback).data(getVoyager(distances.length)));
    }

    return individuals;
})());

console.log('BEFORE');
console.log(routesPopulation.best().data(), 1/routesPopulation.best().fitness());
console.log(routesPopulation.data().map(function(individual) {
    return individual.data();
}));

var seq = sequencer(routesPopulation);
seq.recombineCallback(dumbRecombine);

var routesPopulation2 = seq.run(30000);

console.log('AFTER');
console.log(routesPopulation2.best().data(), 1/routesPopulation2.best().fitness());
// console.log(routesPopulation2.data().map(function(individual) {
//     return individual.data();
// }));

});
