/*
The Binary Search Tree (BST) is a specialization of the binary tree. BST has the 
same restriction as a binary tree; each node has at most two children. However, 
there’s another restriction: the values are ordered. It means the left child’s 
value has to be less or equal than the parent and the right child’s value 
has to be bigger than the parent.
*/


const BinaryTreeNode = require('./7-BinarySearchTreeNode');

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    /**
     * Insert value on the BST.
     * If the value is already in the tree,
     * then it increases the multiplicity value
     * @param {any} value node's value to insert in the tree
     * @returns {BinaryTreeNode} newly added node
     */
    add(value) {
        let node = new BinaryTreeNode(value);
        if (this.root) {
            const { found, parent } = this.findNodeAndParent(value); // <1>
            if (found) { // duplicated: value already exist on the tree
                found.meta.multiplicity = (found.meta.multiplicity || 1) + 1; // <2>
                node = found;
            } else if (value < parent.value) {
                parent.setLeftAndUpdateParent(node);
            } else {
                parent.setRightAndUpdateParent(node);
            }
        } else {
            this.root = node;
        }

        this.size += 1;
        return node;
    }

    /**
     * Find if a node is present or not
     * @param {any} value node to find
     * @returns {boolean} true if is present, false otherwise
     */
    has(value) {
        return !!this.find(value);
    }

    /**
     * @param {any} value value to find
     * @returns {BinaryTreeNode|null} node if it found it or null if not
     */
    find(value) {
        return this.findNodeAndParent(value).found;
    }

    /**
     * Recursively finds the node matching the value.
     * If it doesn't find, it returns the leaf `parent` where the new value should be appended.
     * @param {any} value Node's value to find
     * @param {BinaryTreeNode} node first element to start the search (root is default)
     * @param {BinaryTreeNode} parent keep track of parent (usually filled by recursion)
     * @returns {object} node and its parent like {node, parent}
     */
    findNodeAndParent(value, node = this.root, parent = null) {
        if (!node || node.value === value) return { found: node, parent };
        if (value < node.value) {
            return this.findNodeAndParent(value, node.left, node);
        }
        return this.findNodeAndParent(value, node.right, node);
    }
    
    /**
     * Remove a node from the tree
     * @returns {boolean} false if not found and true if it was deleted
     */
    remove(value) {
        const { found: nodeToRemove, parent } = this.findNodeAndParent(value); // <1>
        if (!nodeToRemove) return false; // <2>
        // Combine left and right children into one subtree without nodeToRemove
        const removedNodeChildren = this.combineLeftIntoRightSubtree(nodeToRemove); // <3>
        if (nodeToRemove.meta.multiplicity && nodeToRemove.meta.multiplicity > 1) { // <4>
            nodeToRemove.meta.multiplicity -= 1; // handles duplicated
        } else if (nodeToRemove === this.root) { // <5>
            // Replace (root) node to delete with the combined subtree.
            this.root = removedNodeChildren;
            if (this.root) { this.root.parent = null; } // clearing up old parent
        } else if (nodeToRemove.isParentLeftChild) { // <6>
            // Replace node to delete with the combined subtree.
            parent.setLeftAndUpdateParent(removedNodeChildren);
        } else {
            parent.setRightAndUpdateParent(removedNodeChildren);
        }

        this.size -= 1;
        return true;
    }

    /**
     * Breath-first search for a tree (always starting from the root element).
     * @yields {BinaryTreeNode}
     */
    * bfs() {
        const queue = [];
        queue.push(this.root);
        while (queue.length !== 0) {
            const node = queue.shift();
            yield node;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    /**
     * Depth-first search for a tree (always starting from the root element)
     * @see preOrderTraversal Similar results to the pre-order transversal.
     * @yields {BinaryTreeNode}
     */
    * dfs() {
        const stack = [];
        stack.push(this.root);
        while (stack.length !== 0) {
            const node = stack.pop();
            yield node;
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
    }

    /**
     * In-order traversal on a tree: left-root-right.
     * If the tree is a BST, then the values will be sorted in ascendent order
     * @param {BinaryTreeNode} node first node to start the traversal
     * @yields {BinaryTreeNode}
     */
    * inOrderTraversal(node = this.root) {
        if (node && node.left) yield* this.inOrderTraversal(node.left);
        yield node;
        if (node && node.right) yield* this.inOrderTraversal(node.right);
    }

    /**
     * Pre-order traversal on a tree: root-left-right.
     * Similar results to DFS
     * @param {BinaryTreeNode} node first node to start the traversal
     * @yields {BinaryTreeNode}
     */
    * preOrderTraversal(node = this.root) {
        yield node;
        if (node.left) yield* this.preOrderTraversal(node.left);
        if (node.right) yield* this.preOrderTraversal(node.right);
    }

    /**
     * Post-order traversal on a tree: left-right-root.
     * @param {BinaryTreeNode} node first node to start the traversal
     * @yields {BinaryTreeNode}
     */
    * postOrderTraversal(node = this.root) {
        if (node.left) yield* this.postOrderTraversal(node.left);
        if (node.right) yield* this.postOrderTraversal(node.right);
        yield node;
    }

    /**
     * Represent Binary Tree as an array.
     */
    toArray() {
        const array = [];
        const queue = [];
        const visited = new Map();
        if (this.root) queue.push(this.root);
        while (queue.length !== 0) {
            const current = queue.shift();
            array.push(current && current.value);
            if (current) { visited.set(current); }
            if (current && !visited.has(current.left)) queue.push(current.left);
            if (current && !visited.has(current.right)) queue.push(current.right);
        }

        return array;
    }
}

module.exports = BinarySearchTree;