//As stated earlier, a list node contains two items: the data and the pointer to the next node.
class Node {
    constructor(data) {
        this.data = data
        this.next = null;
    }
}

//The code below shows the implementation of a linked list class with a constructor. Notice that if the head node is not passed, the head is initialised to null.
class LinkedList {
    constructor(head = null) {
        this.head = head;
        this.tail = null;
    }

    // Add a node in the end
    add(value) {
        let node = new Node(value);
        // if list is empty
        if (!this.head) {
            this.head = node;
            this.tail = node;
        }
        else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    // Add a node in the beginning
    addFirst(value) {
        let node = new Node(value);
        node.next = this.head;
        this.head = node;
    }

    // Remove a node from the end
    pop() {
        let currentList = this.head;
        if (!this.head) return;
        if (this.head.next === null) {
            this.head = null;
            this.tail = null;
        } else{
            while (currentList.next.next) {
                currentList = currentList.next;
            }
            this.tail = currentList;
            this.tail.next = null;
        }
    }

    // Remove a node from the beginning
    popFirst() {
        if (this.head && this.head.next) {
            this.head = this.head.next;
        } else this.head = null;
    }

    // Return the first node
    getFirst() {
        return this.head;
    }

    // Return the last node
    getLast() {
        return this.tail;
    }

    // Remove Node at specific point from the list
    removeAt(index) {
        if (index === 0) this.popFirst();
        let i = 0;
        let currentList = this.head;
        let prevList = null;
        while (currentList.next) {
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

    // Insert Node at specific point from the list
    insertAt(index, data) {
        if (index === 0) this.addFirst(data);
        let i = 0;
        let currentList = 0;
        while (!currentList) {
            if (i === index - 1) {
                const node = new Node(value);
                node.next = currentList.next;
                currentList.next = node;
            }else {
                i++;
                currentList = currentList.next;
            }
        }
    }

    // Combert linked list values into array
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