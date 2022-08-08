/* Hash Table */

// Stores key-val pair
// Where we need insertion and deletion in O(1)
// Linkedlist with tail have O(1) for prepend/append/removefromFront
// but removefromend or remove from index is O(n)

// JS objects also inbuilt uses hash tables to store key-val pair
// but keys can only be string and objs in JS have inbuilt-keys which can be overidden accidently
// But we can use MAP, why we need HASH tables
// for interviews

var hash = (string, max) => {
  var hash = 0;
  for (var i = 0; i < string.length; i++) {
    hash += string.charCodeAt(i);
  }
  return hash % max;
};
class HashTable {
  constructor() {
    this.storage = [];
    this.storageLimit = 14;
  }
  
  print() {
    console.log(this.storage)
  }

  add(key, value) {
    let index = hash(key, this.storageLimit);
    if (this.storage[index] === undefined) {
      this.storage[index] = [
        [key, value]
      ];
    } else {
      // handle collision
      var inserted = false;
      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i][0] === key) {
          this.storage[index][i][1] = value;
          inserted = true;
        }
      }
      if (inserted === false) {
        this.storage[index].push([key, value]);
      }
    }
  };
  
  remove(key) {
    let index = hash(key, this.storageLimit);
    if (this.storage[index].length === 1 && this.storage[index][0][0] === key) {
      delete this.storage[index];
    } else {
      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i][0] === key) {
          delete this.storage[index][i];
        }
      }
    }
  };
  
  lookup(key) {
    var index = hash(key, this.storageLimit);
    if (this.storage[index] === undefined) {
      return undefined;
    } else {
      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i][0] === key) {
          return this.storage[index][i][1];
        }
      }
    }
  };

};
console.log(hash('quincy', 10))
let ht = new HashTable();
ht.add('beau', 'person');
ht.add('fido', 'dog');
ht.add('rex', 'dinosour');
ht.add('tux', 'penguin')
console.log(ht.lookup('tux'))
ht.print();

// Usage
// 1. Caches
// 2. DB indexing