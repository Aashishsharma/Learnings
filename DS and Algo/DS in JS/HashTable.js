/* Hash Table */

// Stores key-val pair
// Where we need insertion and deletion in O(1)
// Linkedlist with tail have O(1) for prepend/append/removefromFront
// but removefromend or remove from index is O(n)

// JS objects also inbuilt uses hash tables to store key-val pair
// but keys can only be string and objs in JS have inbuilt-keys which can be overidden accidently
// But we can use MAP, why we need HASH tables
// for interviews

const LinkedlistWithTail = require('./LinkedList');

var hash = (string, max) => {
  var hash = 0;
  for (var i = 0; i < string.length; i++) {
    hash += string.charCodeAt(i);
  }
  return hash % max;
};
class HashTable {
  constructor() {
    // DS - storage array - [[key1, linkedList], [key2, linkedList], ... [keyN, linkedList]]
    // note that [{key: val}, {key2:val}] - does not work
    this.storage = [];
    this.storageLimit = 14;
  }
  
  print() {
    console.log(this.storage)
    for(let abc in this.storage) {
      console.log({abc})
      // if(bucket[1])
      //   bucket[1].print()
    }
  }

  add(key, value) {
    let index = hash(key, this.storageLimit);
    // check if in storage array, if it is undefined or already subarray is present
    let bucket = this.storage[index]

    // if no subarray, create new instance of linkedList, and store it as a subarray (aka. bucket) [key, ll]
    if(!bucket) {
      const llwithTail = new LinkedlistWithTail();
      llwithTail.append(value);
      this.storage[index] = [key, llwithTail];
    } else {
      // if subarray(bucket) already exists then
      const sameValueIndex = bucket[1].search(value);
      // if val is already present in bucket, then update the val 
      if(sameValueIndex !== -1) {
        // note ideally we linkedlistwith tail should have updateValueAtNode func
        // instaed of removing and inserting the node
        bucket[1].remove(sameValueIndex);
        bucket[1].insert({[key]: value}, sameValueIndex-1);
      } else {
        // if val not present in the bucket, then push new val in the bucket
        bucket[1].append({[key]: value});
      }
    }

  };
  
  get(key) {
    let index = hash(key, this.storageLimit);

    let bucket = this.storage[index];
    if(!bucket) {
      return -1
    } else {
      const searchIndex = bucket[1].search();
    }
  }
  //half implementation
  remove(key) {
    let index = hash(key, this.storageLimit);

    let bucket = this.storage[index];
    console.log({bucket}, {key})
    if(!bucket)
      return -1;
    else {
      // find val inside the corresponding bucket
      // search fails below since we need to search by value in linkedlist and not by key
      // and we don't have the value, that is what we want to get
      // for this to work, we need to modify the datastructure of the linkedlist itself
      // instead of storing plain value in the node, store an object
      const serachValInBucket = bucket[1].search(key) // serach based on key
      if(serachValInBucket !== -1) {
        bucket[1].remove(serachValInBucket)
      } else {
        console.log({serachValInBucket})
        return -1
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
//console.log(hash('quincy', 10))
let ht = new HashTable();
ht.add('beau', 'person');
ht.add('fido', 'dog');
ht.add('rex', 'dinosour');
ht.add('tux', 'penguin');
ht.add('txu', 'penguin2');
//console.log(ht.lookup('tux'))
ht.print();
console.log(ht.remove('tux'))
ht.print();
// Usage
// 1. Caches
// 2. DB indexing
