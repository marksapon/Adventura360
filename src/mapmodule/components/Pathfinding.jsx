class Graph {
  constructor() {
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }
}

class Node {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.neighbors = [];
    // this.cost = 0;
  }

  addNeighbor(neighbor) {
    this.neighbors.push(neighbor);
  }

  // cost(cost) { // The value of how hard it is to get to the node
  //     this.cost = cost;
  // }
}

function euclideanDistance(node1, node2) {
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function reconstructPath(cameFrom, current) {
  const path = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current);
    path.push(current);
  }
  return path.reverse();
}

function astar(graph, start, goal) {
  const openSet = new Set(); // The set of nodes to be evaluated
  const cameFrom = new Map(); // The map of navigated nodes

  const gScore = new Map(); // Cost from start along best known path
  const fScore = new Map(); // Estimated total cost from start to goal through y

  // Initialize gScore and fScore for all nodes
  graph.nodes.forEach((node) => {
    gScore.set(node, Infinity);
    fScore.set(node, Infinity);
  });

  gScore.set(start, 0); // The cost of going from start to start is zero
  fScore.set(start, euclideanDistance(start, goal)); // For the first node, it is set by distance to target

  openSet.add(start); // Add the start node to the open set

  while (openSet.size > 0) {
    let current = null; // The node in openSet having the lowest fScore[] value
    let minFScore = Infinity; // Initialize to infinity

    // Find the node in openSet having the lowest fScore
    openSet.forEach((node) => {
      // Iterate through all nodes in openSet to find the one with the lowest fScore
      if (fScore.get(node) < minFScore) {
        minFScore = fScore.get(node);
        current = node;
      }
    });

    if (current === goal) {
      return reconstructPath(cameFrom, current);
    }

    openSet.delete(current);

    current.neighbors.forEach((neighbor) => {
      const tentativeGScore =
        gScore.get(current) + euclideanDistance(current, neighbor);
      if (tentativeGScore < gScore.get(neighbor)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(
          neighbor,
          gScore.get(neighbor) + euclideanDistance(neighbor, goal),
        );
        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
        }
      }
    });
  }

  return "No existing paths"; // No path foundhim
}

// Function to generate nodes dynamically
// MODIFY
// function generateNodes(graph, numNodes) {
//     for (let i = 0; i < numNodes; i++) {
//         const node = new Node(
//             "node" + i,
//             Math.random() * 100,
//             Math.random() * 100
//         ); // Random coordinates
//         graph.addNode(node);
//     }
// }

// Example usage:

// generateNodes(graph, 5); // Generate 5 nodes

// Connect nodes randomly for demonstration
// REMOVE THIS FOR YOUR OWN USAGE
// graph.nodes.forEach((node) => {
//     const randomNeighbors = graph.nodes.filter(
//         (n) => n !== node && Math.random() < 0.5
//     ); // Randomly connect nodes
//     randomNeighbors.forEach((neighbor) => node.addNeighbor(neighbor));
// });

const graph = new Graph();

const start = new Node("start", 0, 0);
const node2 = new Node("node2", 1, 0);
const node3 = new Node("node3", 2, 0);
const node4 = new Node("node4", 3, 0);
const node5 = new Node("node5", 0, -1);
const node6 = new Node("node6", 1, -1);
const node7 = new Node("node7", 2, -1);
const node8 = new Node("node8", 4, -1);
const node9 = new Node("node9", 0, 1);
const node10 = new Node("node10", -1, 0);
const target = new Node("target", 4, 0);

start.addNeighbor(node2);
start.addNeighbor(node9);
start.addNeighbor(node10);
start.addNeighbor(node5);

node2.addNeighbor(start);
node2.addNeighbor(node3);
node2.addNeighbor(node6);
node2.addNeighbor(node8);

node3.addNeighbor(node2);
node3.addNeighbor(node4);

node4.addNeighbor(node3);
node4.addNeighbor(target);

node5.addNeighbor(start);
node5.addNeighbor(node6);

node6.addNeighbor(node5);
node6.addNeighbor(node7);
node6.addNeighbor(node2);

node7.addNeighbor(node6);
node7.addNeighbor(node8);

node8.addNeighbor(node7);
node8.addNeighbor(node2);
node8.addNeighbor(target);

node9.addNeighbor(start);

node10.addNeighbor(start);

graph.addNode(start);
graph.addNode(node2);
graph.addNode(node3);
graph.addNode(node4);
graph.addNode(node5);
graph.addNode(node6);
graph.addNode(node7);
graph.addNode(node8);
graph.addNode(node9);
graph.addNode(node10);
graph.addNode(target);

const startNode = start; // Start from the first node
const goalNode = target; // Goal is the last node

const path = astar(graph, startNode, goalNode);
const printPath = path.map((node) => node.id).join(" -> "); // Print the path
console.log(printPath); // Output: Path array containing nodes from startNode to goalNode
