/*
Linked list is a linear data structure in which elements are not in contiguous 
memory locations like arrays. It consists of a group of nodes and each node has 
its own data and address to the next node. 

The advantage of the linked list is that the insertion and deletion are easier 
than array, as the elements in an array are stored in a consecutive location so 
linked list have insertion and deletion in constant time O(1).

Use arrays when:
- You want to access random elements by index 'is constant time O(1)'.
- You need two-dimensional and multi-dimensional arrays.

Use linked list when:
- You want to access elements in a sequential manner.
- You want to insert elements at the start and end of the list.
- You want to save some memory when dealing with possibly large data sets.
*/

class Node {
    constructor(data) {
        this.data = data
        this.next = null;
    }
}
class LinkedList {
    constructor(head = null) {
        this.head = head;
        this.tail = null;
    }

    /**
     * Add a node in the end
     * Runtime: O(1)
     * 
     * @param {any} value  node's value
     */
    add(value) {
        let node = new Node(value);
        if (!this.head) { // if list is empty
            this.head = node;
            this.tail = node;
        }
        else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    /**
     * Add a node in the beginning
     * Runtime: O(1)
     * 
     * @param {*} value 
     */
    addFirst(value) {
        let node = new Node(value);
        node.next = this.head;
        this.head = node;
    }

    /**
     * Remove a node from the end
     * Runtime: O(n)
     * 
     * @returns 
     */
    pop() {
        let currentList = this.head;
        if (!this.head) return;
        if (this.head.next === null) {
            this.head = null;
            this.tail = null;
        } else {
            while (currentList.next.next) {
                currentList = currentList.next;
            }
            this.tail = currentList;
            this.tail.next = null;
        }
    }

    /**
     * Remove a node from the beginning
     * Runtime: O(1)
     */
    popFirst() {
        if (!this.head) return;
        if (!this.head.next) {
            this.head = null;
            this.tail =null;
        } else {
            this.head = this.head.next;
        }
    }

    /**
     * Return the first node
     * Runtime: O(1)
     * @returns 
     */
    getFirst() {
        return this.head;
    }

    /**
     * Return the last node
     * Runtime: O(1)
     * 
     * @returns 
     */
    getLast() {
        return this.tail;
    }

    /**
     * Remove Node at specific point from the list
     * Runtime: O(n)
     * 
     * @param {any} index 
     */
    removeAt(index) {
        if (index === 0) this.popFirst();
        let i = 0;
        let currentList = this.head;
        let prevList = null;
        while (!currentList) {
            if (i === index) {
                prevList.next = currentList.next;
                currentList = null;
            } else {
                prevList = currentList;
                currentList = currentList.next;
                i++;
            }
        }
    }

    /**
     * Insert Node at specific point from the list
     * Runtime: O(n)
     * 
     * @param {*} index 
     * @param {*} data 
     */
    insertAt(index, data) {
        if (index === 0) this.addFirst(data);
        let i = 0;
        let currentList = this.head;
        while (!currentList) {
            if (i === index - 1) {
                const node = new Node(data);
                node.next = currentList.next;
                currentList.next = node;
            } else {
                i++;
                currentList = currentList.next;
            }
        }
    }

    /**
     * Combert linked list values into array
     * Runtime: O(n)
     * 
     * @returns {array} arr
     */
    _toArray() {
        let arr = [];
        let cur = this.head;
        while (cur) {
            arr.push(cur.data);
            cur = cur.next;
        }

        return arr;
    }
}

module.exports = HasTable;

let l = new LinkedList();
l.add(1);
l.add(2);
l.add(3);
l.add(4);
l.add(5);
l.addFirst(6);
l.pop();       // Remove a node from the end
l.popFirst();  // Remove a node from the beginning
l.getFirst();  // Return the first node
l.getLast();   // Return the last node
l.removeAt(1); // Remove Node at specific point from the list
l.insertAt(1, 1); // Insert Node at specific point from the list
l._toArray();  // Combert linked list values into array





