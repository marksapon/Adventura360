function pathfinding(currLoc, targetLoc, nodeList) {
    /* Graph Class (Optional can be changed into an array instead of class) */
    class Graph {
        constructor(nodeList) {
            // Node[] stores every node that exists in the map
            this.nodes = [];
            generateNodes(nodeList); // Generate nodes dynamically
        }

        // Method to add a node to the graph
        addNode(node) {
            this.nodes.push(node);
        }

        // Function that connects nodes to each other using nodelist
        generateNodes(nodeList) {
            nodeList.forEach((node_element) => {
                const node = new Node(node_element.id, node_element.coords.x, node_element.coords.y); // new  Node (id of node, x and y coordinates)
                this.nodes.push(node);
            });

            graph.nodes.forEach((node) => {
                // Class Node
                nodeList.neighbor.forEach((elem) => {
                    const matchingNode = graph.nodes.find(
                        (obj) => obj.id === elem
                    );
                    if (matchingNode) {
                        node.addNeighbor(matchingNode);
                    }
                });
            });
        }
    }

    /* Node Class: Represents a node in the graph */

    class Node {
        constructor(id, x, y) {
            // Should have the values of:
            this.id = id; // Name of Scene
            this.x = x; // X coordinate Img Pixel
            this.y = y; // X coordinate Img Pixel
            this.neighbors = []; // Neighbor nodes
            this.pathType = "both"; // Type of path (walkable, vehicle, both)
        }

        // Method to add a neighboring node to current node
        addNeighbor(neighbor) {
            this.neighbors.push(neighbor);
        }
    }

    // Heuristic Function for determining distance of two nodes
    function euclideanDistance(node1, node2) {
        const dx = node1.x - node2.x;
        const dy = node1.y - node2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Function to reconstruct the path from start to goal
    function reconstructPath(cameFrom, current) {
        // cameFrom = Map of Paths, current = Goal Class Node
        const path = [current]; // path = [Goal Node,]

        // Looping through the map of paths until it reached the start node
        while (cameFrom.has(current)) {
            // cameFrom has a current(goal node)
            current = cameFrom.get(current); // the value of key current is the new current

            path.push(current); // push goal node to path
        }
        return path.reverse();
    }

    /* A* Algorithm */
    function astar(graph, start, goal, travelType = "both") {
        const openSet = new Set(); // The set of nodes to be evaluated
        const cameFrom = new Map(); // The map of navigated nodes

        const gScore = new Map(); // Cost from start along best known path
        const fScore = new Map(); // Estimated total cost from start to goal through y

        /* Map does not take duplicate elements */

        // Initialize gScore and fScore for all nodes to Infinity
        graph.nodes.forEach((node) => {
            gScore.set(node, Infinity);
            fScore.set(node, Infinity);
        });

        gScore.set(start, 0); // Update the starting node value's cost of going from start -> start = zero
        fScore.set(start, euclideanDistance(start, goal)); // Update the value of starting. Set distance to target

        openSet.add(start); // Add the start node to the open set

        /* QUEUE of Nodes */
        while (openSet.size > 0) {
            let current = null; // The node in openSet having the lowest fScore[] value
            let minFScore = Infinity; // Initialize to infinity

            // Find the node in openSet having the lowest fScore
            openSet.forEach((node) => {
                // Iterate through all nodes in openSet to find the one with the lowest fScore
                if (fScore.get(node) < minFScore) {
                    //fscore.get(distance from start -> goal) < minFScore (Infinity)
                    minFScore = fScore.get(node);
                    current = node;
                }

                /* This conditionals basically checks for each node in the queue
                and checks if they have smallest fscore. If the node has smallest fscore,
                it set it as a current and minFScore*/
            });

            // Check if the current node is the goal
            if (current === goal) {
                return reconstructPath(cameFrom, current); // cameFrom contains all paths, current = goal
            }

            // Delete the current from queue
            openSet.delete(current);

            // Iterate through all neighbors of the current node
            current.neighbors.forEach((neighbor) => {
                // If the neighbor is not accessible to current travelType,
                // skip to the next neighbor if cannot travel into neighbor
                if (neighbor.pathType === travelType) {
                    // tentative GScore
                    // (Tentative GSCore = get current gscore + distance from current to its neighbor)
                    const tentativeGScore =
                        gScore.get(current) +
                        euclideanDistance(current, neighbor);

                    // This condition checks if the neighbor gscore is greater than the tentative gscore
                    if (tentativeGScore < gScore.get(neighbor)) {
                        cameFrom.set(neighbor, current); // Add the neighbor cameFrom, current to the map

                        gScore.set(neighbor, tentativeGScore); // Set the neighbor gscore to the tentative gscore

                        fScore.set(
                            neighbor,
                            gScore.get(neighbor) +
                                euclideanDistance(neighbor, goal)
                        ); // Set the neighbor fscore to the gscore + distance from neighbor to goal

                        if (!openSet.has(neighbor)) {
                            openSet.add(neighbor); // Add the neighbor to the open set
                        }
                    }
                }
            });
        }

        return null; // No path found
    }

    const graph = new Graph(nodeList); // Create a new graph

    const startNode = currLoc; // Start from the first node
    const goalNode = targetLoc; // Goal is the last node

    const path = astar(graph, startNode, goalNode, "both");

    // const pathCoords = []; // Array to store path coordinates

    // path.map((node) => {
    //     pathCoords.push({ x: node.x, y: node.y }); // Push the coordinates of each node to pathCoords
    // }); // Collect path coordinates

    return path; // Output: Path array containing nodes from startNode to goalNode
}

export default pathfinding;
