const graphlib = require('graphlib');

const createGraph = () => {
    const graph = new graphlib.Graph({ directed: true });

    const edges = [
        { v: '1', w: '2', value: 8 },
        { v: '1', w: '8', value: 8 },
        { v: '1', w: '6', value: 14 },
        { v: '2', w: '3', value: 9 },
        { v: '2', w: '4', value: 12 },
        { v: '2', w: '10', value: 11 },
        { v: '3', w: '5', value: 13 },
        { v: '3', w: '6', value: 15 },
        { v: '5', w: '6', value: 15 },
        { v: '6', w: '8', value: 18 },
        { v: '6', w: '7', value: 22 },
        { v: '7', w: '9', value: 21 },
        { v: '8', w: '9', value: 10 },
        { v: '8', w: '10', value: 8 },
        { v: '9', w: '10', value: 12 },
    ];

    edges.forEach((edge) => {
        graph.setEdge(edge.v, edge.w, edge.value);
    });

    return graph;
};

module.exports = {
    createGraph,
};