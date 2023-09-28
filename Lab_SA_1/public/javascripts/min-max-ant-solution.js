const graphlib = require('graphlib');

const graphModule = require('./graph-data'); 

const graph = graphModule.createGraph();

console.log(graphlib.json.write(graph));

class MinMaxAntSystem {
    constructor(graph, params) {

    }
}

class Ant {
    constructor(graph, pheromoneMatrix, params) {

    }
}

module.exports = {
    MinMaxAntSystem
}