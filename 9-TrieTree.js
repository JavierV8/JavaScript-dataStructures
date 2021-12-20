class Node {
    constructor(value) {
        this.value = value
        this.isEndOfWord = false // false by default, a green node means this flag is true
        this.children = {} // children are stored as Map, where key is the letter and value is a TrieNode for that letter 
        this.parent = null;
    }
}

class Trie {
    constructor() {
        this.root = new Node(null)
    }

    insert(word) {
        let current = this.root
        // iterate through all the characters of word
        for (let character of word) {
            // if node doesn't have the current character as child, insert it
            if (current.children[character] === undefined) {
                current.children[character] = new Node(character);
                current.children[character].parent = current;
            }
            // move down, to insert next character
            current = current.children[character]
        }
        // mark the last inserted character as end of the word
        current.isEndOfWord = true;
    }

    search(word) {
        let current = this.root
        // iterate through all the characters of word
        for (let character of word) {
            if (current.children[character] === undefined) {
                // could not find this character in sequence, return false
                return false
            }
            // move down, to match next character
            current = current.children[character]
        }
        // found all characters, return true if last character is end of a word
        return current.isEndOfWord
    }

    // returns every word with given prefix
    // time complexity: O(p + n), p = prefix length, n = number of child paths
    find(prefix) {
        var node = this.root;
        var output = [];
        for (let character of prefix) {
            if (node.children[character]) {
                node = node.children[character];
            } else {
                return output;
            }
        }
        // recursively find all words in the node
        findAllWords(node, output);
        return output;
    };

    // recursive function to find all words in the given node.
    findAllWords(node, output) {
        if (node.end) {
            output.unshift(node.getWord());
        }
        for (var child in node.children) {
            findAllWords(node.children[child], output);
        }
    }

    // iterates through the parents to get the word.
    // time complexity: O(k), k = word length
    getWord() {
        var output = [];
        var node = this;
        while (node !== null) {
            output.unshift(node.key);
            node = node.parent;
        }
        return output.join('');
    };
}

const trie = new Trie();

// insert few words
trie.insert("CAT");
trie.insert("DOG");

// search something
trie.search("MAT") // false
trie.search("DOG") // true

/*
Space complexity:
In the worst case, each character of all inserted words can take up a single node in a Trie. So that would mean worst space complexity can be (W*n), where W is average number of characters per word and n is total number of words in the Trie.

Time complexity:
Insert: For inserting a word having n characters, we just need to loop through n characters, so time complexity is O(n)
Search: Similar to Insertion, we only need to loop through all the characters of the word to search it. So time complexity is O(n), where n is number of characters in the word.
Now, step back for a moment and think how else could you search for a word in a huge list of words?

Probably using an array? Time complexity would be O(m), where where m is total number of words, which is pretty bad.
How about using a map (or an object in JavaScript) ? Well, that would decrease time complexity to O(1), but how fast it would be to find list of words having certain prefix? It would be O(m).
Trie not only brings down the time complexity to O(n) (n = no. of characters in word), but you can also effectively search for a list of words having a prefix, which would be a much more expensive task with any of the two approaches above.

Applications
Autocomplete and Typeahead: If you type something in a text box and you see list of potential searches with same prefix i.e. an Autocomplete widget, then that's probably being handled by a Trie behind the scenes. Similarly Typeahead can also be implemented using a Trie.

Spell checker: We can use trie to create a spell checker i.e. given a list of words we can check if the spelling of a given word is correct or not.

IP routing (Longest prefix matching): The Internet consists of multiple router nodes which decide the destination packet should be sent. Each router on the Internet needs to send the packet to the appropriate target node decided by the given IP destination. But how each router can decide the next destined router with the given IP address? This problem can be solved using IP routing. Here's a great article diving into this subject.
