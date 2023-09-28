const graphlib = require('graphlib');

const graphModule = require('./graph-data'); 

const graphRel = graphModule.createGraph();

console.log(graphlib.json.write(graphRel));

class MinMaxAntSystem {
    constructor(graph, params) {

    }

    initializePheromoneMatrix() {

    }

    run() {

    }

    generateAnts() {

    }

    updatePheromone() {

    }
}

class Ant {
    constructor(graph, pheromoneMatrix, params) {

    }

    findTour() {

    }

    selectNextNode() {

    }

    selectNextNodeDeterministic(neighborInfoList) {

    }

    selectNextNodeProbabilistic(neighborInfoList) {

    }
}

const graph = [
    //Initlize graph here
];

const param = [
    //Initilize params for MMSA
];

module.exports = {
    MinMaxAntSystem
}