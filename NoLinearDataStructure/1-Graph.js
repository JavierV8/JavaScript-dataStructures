const Node = require('./1-GraphNode');

/**
 * Graph data structure
 */
class Graph {
    constructor(isUndirected = false) {
        this.nodes = new Map();
        this.isUndirected = isUndirected;
    }

    /**
     * Add a node to the graph.
     * Runtime: O(1)
     * @param {any} value node's value
     * @returns {Node} the new node or the existing one if it already exits.
     */
    addVertex(value) {
        if (this.nodes.has(value)) return this.nodes.get(value);
        const vertex = new Node(value);
        this.nodes.set(value, vertex);
        return vertex;
    }

    /**
     * Removes node from graph
     * It also removes the reference of the deleted node from
     * anywhere it was adjacent to.
     * Runtime: O(|V|) because adjacency list is implemented with a HashSet.
     * It were implemented with an array then it would be O(|V| + |E|).
     * @param {any} value node's value
     */
    removeVertex(value) {
        const current = this.nodes.get(value);
        if (current) {
            Array.from(this.nodes.values()).forEach((node) => node.removeAdjacent(current));
        }
        return this.nodes.delete(value);
    }

    /**
     * Create a connection between the source node and the destination node.
     * If the graph is undirected, it will also create the link from destination to source.
     * If the nodes don't exist, then it will make them on the fly.
     * Runtime: O(1)
     * @param {any} source
     * @param {any} destination
     * @returns {[Node, Node]} source/destination node pair
     */
    addEdge(source, destination) {
        const sourceNode = this.addVertex(source);
        const destinationNode = this.addVertex(destination);
        sourceNode.addAdjacent(destinationNode);
        if (this.isUndirected) {
            destinationNode.addAdjacent(sourceNode);
        }

        return [sourceNode, destinationNode];
    }

    /**
     * Remove the connection between source node and destination.
     * If the graph is undirected, it will also create the link from destination to source.
     *
     * Runtime: O(1): implemented with HashSet.
     * If implemented with array, would be O(|E|).
     *
     * @param {any} source
     * @param {any} destination
     */
    removeEdge(source, destination) {
        const sourceNode = this.nodes.get(source);
        const destinationNode = this.nodes.get(destination);
        if (sourceNode && destinationNode) {
            sourceNode.removeAdjacent(destinationNode);
            if (this.isUndirected) {
                destinationNode.removeAdjacent(sourceNode);
            }
        }

        return [sourceNode, destinationNode];
    }

    /**
     * True if two nodes are adjacent.
     * @param {any} source node's value
     * @param {any} destination node's value
     */
    areAdjacents(source, destination) {
        const sourceNode = this.nodes.get(source);
        const destinationNode = this.nodes.get(destination);
        if (sourceNode && destinationNode) {
            return sourceNode.isAdjacent(destinationNode);
        }

        return false;
    }

    /**
     * Depth-first search
     * Use a stack to visit nodes (LIFO)
     * @param {Node} first node to start the dfs
     */
    static * dfs(first) {
        const visited = new Map();
        const visitListStack = [];
        visitListStack.push(first);
        while (visitListStack.length !== 0) {
            const node = visitListStack.pop();
            if (node && !visited.has(node)) {
                yield node;
                visited.set(node);
                node.getAdjacents().forEach((adj) => visitListStack.push(adj));
            }
        }
    }

    /**
     * Breadth-first search
     * Use a queue to visit nodes (FIFO)
     * @param {Node} first node to start the dfs
     */
    static * bfs(first) {
        const visited = new Map();
        const visitListQueue = [];
        visitListQueue.push(first);
        while (visitListQueue.length !== 0) {
            const node = visitListQueue.unshift();
            if (node && !visited.has(node)) {
                yield node;
                visited.set(node);
                node.getAdjacents().forEach((adj) => visitListQueue.push(adj));
            }
        }
    }
}

module.export = Graph;
