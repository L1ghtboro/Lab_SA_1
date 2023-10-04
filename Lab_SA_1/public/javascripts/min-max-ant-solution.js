class MinMaxAntSystem {
    constructor(numNodes, params) {
        this.numNodes = numNodes;
        this.params = params || {
            numAnts: 10,              // Number of ants
            maxIterations: 100,      // Maximum iterations
            alpha: 8.0,              // Influence of pheromone
            beta: 1.0,               // Influence of distance
            rho: 0.01,                // Pheromone evaporation rate
            q0: 0.9,                 // Threshold for selecting the best next node
            minPheromone: 0.35,      // Minimum pheromone level
        };
        this.pheromoneMatrix = this.initializePheromoneMatrix();
        this.ants = [];
        this.bestTour = null;
        this.bestTourLength = Infinity;
    }

    // Initialize the pheromone matrix with initial values
    initializePheromoneMatrix() {
        const initialPheromone = 1.0 / (this.numNodes * this.params.rho);
        const pheromoneMatrix = Array.from({ length: this.numNodes }, () =>
            Array.from({ length: this.numNodes }, () => initialPheromone)
        );

        return pheromoneMatrix;
    }

    updateBestTour() {
        // Iterate through all the ants and find the ant with the shortest tour
        for (const ant of this.ants) {
            const tour = ant.tour;
            if (tour.length > 0 && tour.length < this.bestTourLength) {
                // Update the best tour and its length
                this.bestTour = tour.slice(); // Clone the tour
                let total = 0;
                tour.forEach(element => {
                    total += element;
                });
                this.bestTourLength = total;
            }
        }
    }

    // Run the ant system algorithm
    run() {
        for (let iteration = 0; iteration < this.params.maxIterations; iteration++) {
            this.generateAnts();
            this.updateBestTour();
            this.updatePheromone();
        }
        return this.bestTour; // Return the best tour found
    }

    // Generate ant solutions
    generateAnts() {
        for (let i = 0; i < this.params.numAnts; i++) {
            const ant = new Ant(this.numNodes, this.pheromoneMatrix, this.params);
            const tour = ant.findTour();
            let total = 0; 
            tour.forEach(element => {
                total += element;
            });
            if (tour.length > 0 && total < this.bestTourLength) {
                this.bestTour = tour; // Update the best tour if a shorter one is found
                this.bestTourLength = total;
            }
            this.ants.push(ant);
        }
    }

    // Update pheromone levels
    updatePheromone() {
        for (let i = 0; i < this.numNodes; i++) {
            for (let j = 0; j < this.numNodes; j++) {
                this.pheromoneMatrix[i][j] *= (1 - this.params.rho);
                if (this.pheromoneMatrix[i][j] < this.params.minPheromone) {
                    this.pheromoneMatrix[i][j] = this.params.minPheromone;
                }
            }
        }

        for (let i = 0; i < this.bestTour.length - 1; i++) {
            const from = this.bestTour[i];
            const to = this.bestTour[i + 1];
            this.pheromoneMatrix[from][to] += 1 / this.bestTourLength;
            this.pheromoneMatrix[to][from] += 1 / this.bestTourLength;
        }
    }
}

class Ant {
    constructor(numNodes, pheromoneMatrix, params) {
        this.numNodes = numNodes;
        this.pheromoneMatrix = pheromoneMatrix;
        this.params = params;
        this.visited = new Set();
        this.tour = [];
        this.currentNode = params.startNode; // Start node set as default 
        this.visited.add(params.startNode);
    }

    // This method is used to find the tour (path) for the ant.
    findTour() {
        while (this.visited.size < this.numNodes && this.currentNode !== this.params.endNode) {
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
        const unvisitedNeighbors = Array.from({ length: this.numNodes }, (_, neighbor) => neighbor)
            .filter(neighbor => !this.visited.has(neighbor) && this.params.distanceMatrix[currentNode][neighbor] != 0)
            .map(neighbor => ({
                neighbor,
                distance: this.params.distanceMatrix[currentNode][neighbor],
                pheromone: this.pheromoneMatrix[currentNode][neighbor],
            }));

        if (unvisitedNeighbors.length === 0) {
            return -1;
        }

        let nextNode = -1;
        if (Math.random() < this.params.q0) {
            nextNode = this.selectNextNodeDeterministic(unvisitedNeighbors);
        } else {
            nextNode = this.selectNextNodeProbabilistic(unvisitedNeighbors);
        }

        return nextNode;
    }

    // Select the next node deterministically
    selectNextNodeDeterministic(neighborInfoList) {
        const probabilities = neighborInfoList.map(info => {
            const p = Math.pow(info.pheromone, this.params.alpha) * Math.pow(1 / info.distance, this.params.beta);
            return p;
        });

        const maxProbabilityIndex = probabilities.indexOf(Math.max(...probabilities));
        return neighborInfoList[maxProbabilityIndex].neighbor;
    }

    // Select the next node probabilistically
    selectNextNodeProbabilistic(neighborInfoList) {
        const totalProbability = neighborInfoList.reduce((sum, info) => {
            return sum + (Math.pow(info.pheromone, this.params.alpha) * Math.pow(1 / info.distance, this.params.beta));
        }, 0);

        const r = Math.random() * totalProbability;
        let cumulativeProbability = 0;

        for (const info of neighborInfoList) {
            const p = (Math.pow(info.pheromone, this.params.alpha) * Math.pow(1 / info.distance, this.params.beta));
            cumulativeProbability += p;
            if (cumulativeProbability >= r) {
                return info.neighbor;
            }
        }

        return neighborInfoList[neighborInfoList.length - 1].neighbor;
    }
}

module.exports = {
    MinMaxAntSystem,
};