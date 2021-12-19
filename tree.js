class Node {
    constructor(value) {
        this.value = value;
        this.children = [];
        this.parent = null;
    }

    setParentNode(node) {
        this.parent = node;
    }
    getParentNode() {
        return this.parent;
    }
    addChild(node) {
        node.setParentNode(this);
        this.children[this.children.length] = node;
    }
    getChildren() {
        return this.children;
    }
    removeChildren() {
        this.children = [];
    }
}

var root = new Node('root');
root.addChild(new Node('child 0'));
root.addChild(new Node('child 1'));
var children = root.getChildren();
for(var i = 0; i < children.length; i++) {
    for(var j = 0; j < 5; j++) {
        children[i].addChild(new Node('second level child ' + j));
    }
}
console.log(root);
children[0].removeChildren();
console.log(root);
console.log(root.getParentNode());
console.log(children[1].getParentNode());