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
    constructor(key, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    /**
     * Determine whether it is a terminal node
     * @returns {boolean}
     */
    get isLeaf() {
        return this.left === null && this.right === null;
    }

    /**
     * Determine whether it has children's
     * @returns {boolean}
     */
    get hasChildren() {
        return !this.isLeaf;
    }
}

class BinaryTree {
    constructor(key, value = key) {
        this.root = new BinaryTreeNode(key, value);
    }

    /**
     * Traverse the tree starting from left tree, 
     * @param {any} node 
     */
    *inOrderTraversal(node = this.root) {
        if (node.left) yield* this.inOrderTraversal(node.left);
        yield node;
        if (node.right) yield* this.inOrderTraversal(node.right);
    }

    /**
     * 
     * @param {*} node 
     */
    *postOrderTraversal(node = this.root) {
        if (node.left) yield* this.postOrderTraversal(node.left);
        if (node.right) yield* this.postOrderTraversal(node.right);
        yield node;
    }

    /**
     * 
     * @param {*} node 
     */
    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.left) yield* this.preOrderTraversal(node.left);
        if (node.right) yield* this.preOrderTraversal(node.right);
    }

    /**
     * Insert element
     * @param {*} parentNodeKey 
     * @param {*} key 
     * @param {any} value 
     * @param {any} param3 
     * @returns 
     */
    insert(
        parentNodeKey,
        key,
        value = key,
        { left, right } = { left: true, right: true }
    ) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === parentNodeKey) {
                const canInsertLeft = left && node.left === null;
                const canInsertRight = right && node.right === null;
                if (!canInsertLeft && !canInsertRight) return false;
                if (canInsertLeft) {
                    node.left = new BinaryTreeNode(key, value, node);
                    return true;
                }
                if (canInsertRight) {
                    node.right = new BinaryTreeNode(key, value, node);
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Remove element
     * @param {any} key 
     * @returns 
     */
    remove(key) {
        for (let node of this.preOrderTraversal()) {
            if (node.left.key === key) {
                node.left = null;
                return true;
            }
            if (node.right.key === key) {
                node.right = null;
                return true;
            }
        }
        return false;
    }

    /**
     * Find elemment
     * @param {number} key 
     * @returns 
     */
    find(key) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }
}

const tree = new BinaryTree(1, 'AB');

tree.insert(1, 11, 'AC');
tree.insert(1, 12, 'BC');
tree.insert(12, 121, 'BG', { right: true });

[...tree.preOrderTraversal()].map(x => x.value);
// ['AB', 'AC', 'BC', 'BCG']

[...tree.inOrderTraversal()].map(x => x.value);
// ['AC', 'AB', 'BC', 'BG']

tree.root.value;                // 'AB'
tree.root.hasChildren;          // true

tree.find(12).isLeaf;           // false
tree.find(121).isLeaf;          // true
tree.find(121).parent.value;    // 'BC'
tree.find(12).left;             // null
tree.find(12).right.value;      // 'BG'

tree.remove(12);

[...tree.postOrderTraversal()].map(x => x.value);
// ['AC', 'AB']
