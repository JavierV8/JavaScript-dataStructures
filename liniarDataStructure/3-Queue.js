/*
Queue is a linear data structure that follows the FIFO(First In First Out) 
principle. It contains two-pointers:

front pointer: The front pointer contains the address of the starting element.
rear pointer: The rear pointer contains the address of the last element of the queue.
*/
class Queue {
    constructor() {
        this.items = [];
    }
      
    /**
     * adding element to the queue
     * 
     * @param {any} element 
     */
    add(element){    
        this.items.push(element);
    }

    /**
     * removing element from the queue returns underflow when called on empty queue
     * 
     * @returns {any}
     */
    remove() {
        if(this.isEmpty()) return "Underflow";
        return this.items.shift();
    }

    /**
     * returns the Front element of the queue without removing it.
     * 
     * @returns {any}
     */
    front() {
        if(this.isEmpty()) return "No elements in Queue";
        return this.items[0];
    }

    /**
     * return true if the queue is empty.
     * 
     * @returns {any}
     */
    isEmpty() {
        return this.items.length == 0;
    }

    /**
     * 
     * @returns {string}
     */
    printQueue() {
        var str = "";
        for(var i = 0; i < this.items.length; i++)
            str += this.items[i] +" ";
        return str;
    }
}

module.exports = Queue;