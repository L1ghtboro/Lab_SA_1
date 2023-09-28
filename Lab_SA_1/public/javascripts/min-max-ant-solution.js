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
        this.graph = graph;
        this.pheromoneMatrix = pheromoneMatrix;
        this.params = params;
        this.visited = new Set();
        this.tour = [];
        this.currentNode = params.startNode; // Start node set as default 
        this.visited.add(params.startNode);
    }

    // This method is used to find the tour (path) for the ant.
    findTour() {
        while (this.visited.size < this.graph.nodes().length) {
            const nextNode = this.selectNextNode();
            if (nextNode === -1) break;
            this.tour.push(nextNode);
            this.visited.add(nextNode);
            this.currentNode = nextNode;
        }
        return this.tour;
    }

    // This method selects the next node for the ant based on certain rules.
    selectNextNode() {
        const currentNode = this.currentNode;
        const unvisitedNeighbors = this.graph.neighbors(currentNode)
            .filter(neighbor => !this.visited.has(neighbor))
            .map(neighbor => ({
                neighbor,
                distance: this.graph.edge(currentNode, neighbor),
                pheromone: this.pheromoneMatrix[currentNode][neighbor],
            }));

        if (unvisitedNeighbors.length === 0) {
            return -1; // If other neighbors have been visited
        }

        let nextNode = -1;
        if (Math.random() < this.params.q0) {
            nextNode = this.selectNextNodeDeterministic(unvisitedNeighbors); // Let's choose by pheromones
        } else {
            nextNode = this.selectNextNodeProbabilistic(unvisitedNeighbors); // Choose next
        }

        return nextNode;
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