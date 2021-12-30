/*
A tree is a non-linear data structure where a node can have zero or more connections.
It’s similar to a linear data structures, but the main difference is that instead of 
having the next and previous links, we have an 0 or more number of linked nodes called 
(children/descendants).

Tree data structures constraints
- Can't make a circular loop or have more than two parents. Otherwise, wouldn’t be a 
tree anymore but a graph. ‍️ ‍️
- a tree must have only one root.

TRAVERSAL
Unlike linked lists, one-dimensional arrays and other linear data structures, 
which are traversed in linear order, trees may be traversed in in depth-first or 
breadth-first order. 

There are different kinds of trees, depending on the restrictions. The trees with 
two children or less are called binary.

BINARY TREE:
The binary restricts the nodes to have at most two children.
Depending on how nodes are arranged in a binary tree, it can be full, complete and perfect:

- Full binary tree: each node has exactly 0 or 2 children (but never 1).
- Complete binary tree: when all levels except the last one are full with nodes.
- Perfect binary tree: when all the levels (including the last one) are full of nodes.

*/

class BinaryTreeNode {
    constructor(data, parent = null) {
        this.data = data;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    /**
     * Determine whether it is a terminal node
     * @returns {boolean}
     */
    get isTerminal() {
        return this.left === null && this.right === null;
    }

    /**
     * Determine whether it has children's
     * @returns {boolean}
     */
    get hasChildren() {
        return !this.isTerminal;
    }
}

class BinaryTree {
    constructor(node) {
        this.root = node;
    }

    /**
     * Inserting key into the binary tree at 
     * the first position available.
     * @param {*} parentNodeKey 
     * @param {*} key
     * @returns 
     */
    add(data) {
        for (let node of this.preOrderTraversal()) {
            if (node.left === null) {
                node.left = new BinaryTreeNode(data);
                return true;
            }
            if (node.right === null) {
                node.right = new BinaryTreeNode(data);
                return true;
            }
        }
    }

    /**
     * Insert element
     * @param {*} parentNodeKey 
     * @param {*} key 
     * @param {any} value 
     * @param {any} param3 
     * @returns 
     */
    addAt(parentNode, data, left = true, right = true) {
        for (let node of this.preOrderTraversal()) {
            if (node === parentNode) {
                const canInsertLeft = left && node.left === null;
                const canInsertRight = right && node.right === null;
                if (!canInsertLeft && !canInsertRight) return false;
                if (canInsertLeft) {
                    node.left = new BinaryTreeNode(data, node);
                    return true;
                }
                if (canInsertRight) {
                    node.right = new BinaryTreeNode(data, node);
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Remove element
     * Deleted node is replaced by the bottom-most and rightmost node. 
     * This is different from BST deletion. Here we do not have any order 
     * among elements, so we replace with the last element.
     * @param {any} key 
     * @returns 
     */
    remove(nodeToDelete) {
        if (this.root.left == null && this.root.right == null) {
            return false;
        }
        let key_node = null;
        const queue = [];
        queue.push(this.root);
        let parentNode;
        let currNode;
        while (queue.length !== 0) {
            currNode = queue.shift();
            if (currNode === nodeToDelete) key_node = currNode;
            if (currNode.left) {
                parentNode = currNode; //storing the parent node
                queue.push(currNode.left);
            }
            if (currNode.right) {
                parentNode = currNode; //storing the parent node
                queue.push(currNode.right);
            }
        }
        if (key_node !== null) {
            key_node.value = currNode.value; //replacing key_node's data to deepest node's data
            parentNode.right == currNode ? parentNode.right = null : parentNode.left = null;
            currNode = null;
            return true;
        }

        return false;
    }

    /**
     * Find elemment
     * @param {number} key 
     * @returns 
     */
    find(data) {
        for (let node of this.preOrderTraversal()) {
            if (node.data === data) return node;
        }
        return undefined;
    }

    /**
    * Depth-first traversal preOrder
    * @param {*} node 
    */
    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.left) yield* this.preOrderTraversal(node.left);
        if (node.right) yield* this.preOrderTraversal(node.right);
    }

    /**
     * Depth-first traversal inOrder
     * @param {any} node 
     */
    *inOrderTraversal(node = this.root) {
        if (node.left) yield* this.inOrderTraversal(node.left);
        yield node;
        if (node.right) yield* this.inOrderTraversal(node.right);
    }

    /**
     * Depth-first traversal postOrder
     * @param {*} node 
     */
    *postOrderTraversal(node = this.root) {
        if (node.left) yield* this.postOrderTraversal(node.left);
        if (node.right) yield* this.postOrderTraversal(node.right);
        yield node;
    }

    /**
     * Breadth-First LEVEL ORDER TRAVERSAL
     * @param {*} root 
     * @returns 
     */
    *bfs() {
        const queue = [];
        queue.push(this.root);
        while (queue.length !== 0) {
            const node = queue.shift();
            yield node;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
}

//------------------------------------------------------------------
const root = new BinaryTreeNode(10);
const tree = new BinaryTree(root);

//root.left = new BinaryTreeNode(11);
//root.left.left = new BinaryTreeNode(7);
//root.right = new BinaryTreeNode(9);
//root.right.left = new BinaryTreeNode(15);
//root.right.right = new BinaryTreeNode(8);
tree.addAt(root, 11, true);
tree.addAt(root.left, 7, true);
tree.addAt(root, 9, false, true);
tree.addAt(root.left, 15, false, true);
tree.addAt(root.right, 8, false, true);


console.log("BFS traversal before insertion:");
[...tree.bfs()].map(node => node.data);

console.log("<br\>Inorder traversal after insertion:");
tree.insert(12);
[...tree.inOrderTraversal()].map(node => node.data);

console.log("<br\>Inorder traversal after removal:");
tree.remove(root.left);
[...tree.inOrderTraversal()].map(node => node.data);

tree.root.hasChildren;
tree.find(12).isTerminal;
tree.find(121).isTerminal;
tree.find(121).parent.data;
tree.find(12).left;
tree.find(12).right.data;

//------------------------------------------------------------------