class Stack {
    construcotr() {
        this.stack = [];
    }

    push(value) {
        this.stack.push(value);
    }

    pop(value) {
        if (this.stack.length !== 0) return 'underflow'
            this.stack.pop(value)
    }

    peek() {

    }

}