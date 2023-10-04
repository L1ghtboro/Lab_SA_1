'use strict';
var express = require('express');
var router = express.Router();
var { MinMaxAntSystem } = require('./min-max-ant-solution');

// Define the distance matrix for the graph
const distanceMatrix = [
   //1  2   3   4   5   6   7   8   9  10 
    [0, 8,  0,  0,  0,  14, 0,  8,  0,  0],
    [8, 0,  9,  12, 0,  0,  0,  8,  0,  11],
    [0, 9,  0,  0,  13, 15, 0,  0,  0,  0],
    [0, 12, 0,  0,  0,  0,  0,  0,  0,  0],
    [0, 0,  13, 0,  0,  15, 0,  0,  0,  0],
    [14,0,  15, 0,  15, 0,  22, 18, 0,  0],
    [0, 0,  0,  0,  0,  22, 0,  0,  21, 0],
    [8, 0,  0,  0,  0,  18, 0,  0,  10, 8],
    [0, 0,  0,  0,  0,  0,  21, 10, 0, 12],
    [0, 11, 0,  0,  0,  0,  0,  8,  12, 0],
];

// Define the parameters for the Min-Max Ant System
const params = {
    numAnts: 5,       // Number of ants
    maxIterations: 100, // Maximum iterations
    alpha: 3.0,        // Influence of pheromone
    beta: 2.0,         // Influence of distance
    rho: 0.1,          // Pheromone evaporation rate
    q0: 0.9,           // Threshold for selecting the best next node
    minPheromone: 0.1, // Minimum pheromone level
    distanceMatrix: distanceMatrix, // Include the distance matrix
    startNode: 8,     // Start from node 9
    endNode: 4        // Go to node 5
};

// Create an instance of MinMaxAntSystem
const antSystem = new MinMaxAntSystem(distanceMatrix.length, params);

// Run the Min-Max Ant System
const bestTour = antSystem.run();
antSystem.pheromoneMatrix.forEach((data) => {
    console.log(data.toString());
})

console.log('Best Tour:', bestTour);


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
