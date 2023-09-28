const graphlib = require('graphlib');

const graphModule = require('./graph-data'); 

const graph = graphModule.createGraph();

console.log(graphlib.json.write(graph));

class Solution {

}

module.exports = {
    Solution
}