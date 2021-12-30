/**
 * Graph node/vertex that hold adjacencies nodes.
 */
class Node {
    constructor(value) {
        this.value = value;
        this.adjacents = new Set(); // adjacency list
    }

    /**
     * Add node to adjacency list
     * Runtime: O(1)
     * @param {Node} node
     */
    addAdjacent(node) {
        this.adjacents.add(node);
    }

    /**
     * Remove node from adjacency list
     * Runtime: O(1)
     * @param {Node} node
     * @returns removed node or `false` if node was not found
     */
    removeAdjacent(node) {
        return this.adjacents.delete(node);
    }

    /**
     * Check if a Node is adjacent to other
     * Runtime: O(1)
     * @param {Node} node
     */
    isAdjacent(node) {
        return this.adjacents.has(node);
    }

    /**
     * Get all adjacent nodes
     */
    getAdjacents() {
        return Array.from(this.adjacents);
    }
}

module.exports = Node;