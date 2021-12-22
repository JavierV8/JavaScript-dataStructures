/**
 * Hash table is an associative data structure that relates a key and a value 
 * using a hash function, this function is used to calculate the index where the 
 * elements that we are saving in the table should go.
 * 
 * The hash table save the elements in backets, and the table could have 
 * an arbitray numbers of slots and is the task of the hash function to determine 
 * in witch slot have to go each element.
 * 
 * In hash tables coul happend a thing call a colision and is when more than one 
 * elements is asigned to the same slot by the hash function and by the moment 
 * that more than one elements go to the same slot, it will added as a linked 
 * list in the slot and the time when we watch to obtain an element we have to go 
 * throug all the elements of the linked list.
 */
class HasTable {
    /**
     * Initialize array that holds the values. Default is size 16
     * @param {number} initialCapacity initial size of the array
     * @param {number} loadFactor if set, the Map will automatically rehash when the load factor threshold is met
     */
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.buckets = new Array(initialCapacity);
        this.loadFactor = loadFactor;
        this.size = 0;
    }

    /**
     * A hash function converts keys into array indices
     * transform string into number
     * Runtime: O(n)
     * @param {any} key
     * @returns {BigInt} array index given the bucket size
     */
    hashFunction(key) {
        return Array.from(key)
            .reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0)
    }

    /**
     * Search for a key in the map. It returns it's internal array indexes.
     * Returns bucketIndex and the internal array index
     * Runtime: O(n)
     * @param {string} key
     */
    _getIndexes(key) {
        const bucketIndex = this.hashFunction(key);
        const values = this.buckets[bucketIndex] || [];
        for (const [entryIndex, entry] of Object.entries(values)) {
            if (entry.key === key) return { bucketIndex, entryIndex };
        }
        return { bucketIndex };
    }

    /**
     * Insert a key/value pair into the hash map.
     * If the key is already there replaces its content. Return the Map object to allow chaining
     * Runtime: O(1)
     * @param {string} key
     * @param {any} value
     */
    set(key, value) {
        const { bucketIndex, entryIndex } = this._getIndexes(key);
        if (entryIndex === undefined) {
            // initialize array and save key/value
            this.buckets[bucketIndex] = this.buckets[bucketIndex] || [];
            this.buckets[bucketIndex].push({ key, value });
            this.size++;
        } else {
            // override existing value
            this.buckets[bucketIndex][entryIndex].value = value;
        }

        // check if a rehash is due
        if (this.loadFactor > 0 && this.getLoadFactor() > this.loadFactor) {
            this.rehash(this.buckets.length * 2);
        }

        return this;
    }

    /**
     * Gets the value out of the hash map
     * Returns the value associated to the key, or undefined if there is none.
     * Runtime: O(1)
     * @param {any} key
     * @returns {undefined} not found value
     * @returns {any} found value
     */
    get(key) {
        const { bucketIndex, entryIndex } = this._getIndexes(key);
        if (entryIndex === undefined) return undefined;
        return this.buckets[bucketIndex][entryIndex].value;
    }

    /**
     * Search for key and return true if it was found
     * Runtime: O(1)
     * @param {any} key
     * @returns {boolean}
     */
    has(key) {
        return this._getIndexes(key).entryIndex !== undefined;
    }

    /**
    * Returns true if an element in the Map object existed and has been 
    * removed, or false if the element does not exist.
    * Runtime: O(1)
    * @param {any} key
    * @returns {boolean}
    */
    delete(key) {
        const { bucketIndex, entryIndex } = this._getIndexes(key);
        if (entryIndex === undefined) return false;
        this.buckets[bucketIndex].splice(entryIndex, 1);
        this.size--;
        return true;
    }

    /**
     * Rehash means to create a new Map with a new (higher) capacity with the purpose 
     * of outg.
     * @param {Number} newCapacity
     */
    rehash(newCapacity) {
        const newMap = new HasTable(newCapacity);
        for (const property of this.buckets) {
            for (const entry of property) {
                newMap.set(entry.content, this.get(entry.content));
            }
        }
        // update bucket
        this.buckets = newMap.buckets;
    }

    /**
     * Load factor - measure how full the Map is.
     * It's ratio between items on the map and total size of buckets
     * @returns {number}
     */
    getLoadFactor() {
        return this.size / this.buckets.length;
    }
}

module.exports = HasTable;