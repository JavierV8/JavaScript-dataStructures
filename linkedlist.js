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
        let cur = this.head;

        // only one or no item exists
        if (!cur) return null;
        if (!cur.next) {
            this.head = null;
            return cur;
        }
        // move till the 2nd last
        while (cur.next.next)
            cur = cur.next;
        
        let last = this.tail;
        this.tail = cur;
        this.tail.next = null;
        return last;
    }

    // Remove a node from the beginning
    popFirst() {
        let first = this.head;
        if (this.head && this.head.next) {
            this.head = this.head.next;
            first.next = null;
        }
        else this.head = null;
        return first;
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
        let i = 0;
        let cur = this.head;
        let prev = null;

        while (cur != null) {
        if (i == index) {
            // remove
            if (prev == null)
            this.head = cur.next;
            else prev.next = cur.next;
            cur.next = null;
            return cur.value;
        }
        else {
            prev = cur;
            cur = cur.next;
            i++;
        }
        }
        return null;
    }

    // Insert Node at specific point from the list
    insertAt(index, value) {
        if (index == 0) return this.prepend(value);
        let cur = this.head;
        let i = 0;

        while (cur != null) {
            if (i == index - 1) {
                let node = new Node(value);
                node.next = cur.next;
                cur.next = node;
                return true;
            }
            else {
                i++;
                cur = cur.next;
            }
        }
        return false;
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