/*
Hash table is an associative data structure that relates a key and a value using 
a hash function, this function translates the key into an array’s index. 
It shares some similarities with an array. In an array, the index is always a 
number, while the index in a Map can be anything!

In hash tables coul happend a thing call a colision, and is when more than one 
elements is asigned to the same slot by the hash function and by the moment that 
more than one elements go to the same slot, it will added as a linked list in 
the slot and the time when we watch to obtain an element we have to go throug all 
the elements of the linked list.
*/
class HashTable {
    constructor() {
        this.table = new Array(127);
        this.size = 0;
    }

    /**
     * Hash function, responsable to transform string into number
     * 
     * @param {any} key 
     * @returns {number}
     */
    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.table.length;
    }

    /**
     * Set a value into the hash table.
     * 
     * @param {string} key 
     * @param {any} value 
     * @returns 
     */
    set(key, value) {
        const index = this._hash(key);
        if (this.table[index]) {
            for (let i = 0; i < this.table[index].length; i++) {
                if (this.table[index][i][0] === key) {
                    this.table[index][i][1] = value;
                    return;
                }
            }
            this.table[index].push([key, value]);
        } else {
            this.table[index] = [];
            this.table[index].push([key, value]);
        }
        this.size++;
    }

    /**
     * Get valio by their key
     * 
     * @param {number} key 
     * @returns {any} value
     */
    get(key) {
        const index = this._hash(key);
        if (this.table[index]) {
            for (let i = 0; i < this.table.length; i++) {
                if (this.table[index][i][0] === key) {
                return this.table[index][i][1];
                }
            }
        }
        return undefined;
    }

    /**
     * Remove element from the hash table
     * @param {number} key 
     * @returns 
     */
    remove(key) {
        const index = this._hash(key);
        if (this.table[index] && this.table[index].length) {
            for (let i = 0; i < this.table.length; i++) {
                if (this.table[index][i][0] === key) {
                    this.table[index].splice(i, 1);
                    this.size--;
                    return true;
                }
            }
        } else {
            return false;
        }
    }

    /**
     * 
     */
    display() {
        this.table.forEach((values, index) => {
        const chainedValues = values.map(
            ([key, value]) => `[ ${key}: ${value} ]`
        );
        console.log(`${index}: ${chainedValues}`);
        });
    }
}

const ht = new HashTable();

ht.set("France", 111);
ht.set("Spain", 150);
ht.set("ǻ", 192);

ht.display();
// 83: [ France: 111 ]
// 126: [ Spain: 150 ],[ ǻ: 192 ]

console.log(ht.size); // 3
ht.remove("Spain");
ht.display();
// 83: [ France: 111 ]
// 126: [ ǻ: 192 ]
