/*
Stack is a linear data structure that follows the LIFO(Last In First Out) 
or FILO(First In Last Out) principle. It contains only one pointer the top 
pointer that points to the topmost element of the stack. Whenever we add an 
element to the stack, it is added at the top of the stack and also whenever 
we delete an element from the stack it is deleted from the top of the stack.

Unlike an array, a stack does not offer constant-time access to the ith item. 
However, it does allow constanttime adds and removes, as it doesn't require 
shifting elements around.
*/
class Stack {
    // Array is used to implement stack
    constructor() {
        this.items = [];
    }

    // push element into the items
    push(element) {
        this.items.push(element);
    }

    // return top most element in the stack and removes it from the stack
    pop() {
        if (this.items.length == 0) return "Underflow";
        return this.items.pop();
    }

    // return the top most element from the stack but does'nt delete it.
    peek() {
        return this.items[this.items.length - 1];
    }

    // return true if stack is empty
    isEmpty() {
        return this.items.length == 0;
    }

    printStack() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}

var stack = new Stack();
console.log(stack.isEmpty());
console.log(stack.pop());
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.printStack());
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.printStack()); 