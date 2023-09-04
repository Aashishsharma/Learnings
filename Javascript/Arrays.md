#### Arrays
In JS Array is an object.  
But what makes arrays really special is their internal representation. The engine tries to store its elements in the contiguous memory area, one after another
```javascript
let arr = new Array();
let arr = [];
let fruits = ["Apple", "Orange", "Plum"];

// An array can store elements of any type.
// mix of values
let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];
// get the object at index 1 and then show its name
alert( arr[1].name ); // John
// get the function at index 3 and run it
arr[3](); // hello
```

### Array methods
| **Method**           | **Description**                                                                                                               | **Example**                                                                                                    | **Explanation**                                                                                                                                                                                                                                                   |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `push()`             | Adds one or more elements to the end of an array and returns the new length.                                                   | ```javascript let arr = [1, 2, 3]; arr.push(4, 5); ``` | `push()` modifies the original array by adding elements to its end. In this example, `arr` becomes `[1, 2, 3, 4, 5]`.                                                                                                                                               |
| `pop()`              | Removes and returns the last element from an array.                                                                           | ```javascript let arr = [1, 2, 3]; let last = arr.pop(); ``` | `pop()` modifies the original array by removing the last element. In this example, `last` is `3`, and `arr` becomes `[1, 2]`.                                                                                                                                     |
| `unshift()`          | Adds one or more elements to the beginning of an array and returns the new length.                                           | ```javascript let arr = [2, 3]; arr.unshift(0, 1); ``` | `unshift()` modifies the original array by adding elements to its beginning. In this example, `arr` becomes `[0, 1, 2, 3]`.                                                                                                                                       |
| `shift()`            | Removes and returns the first element from an array.                                                                         | ```javascript let arr = [1, 2, 3]; let first = arr.shift(); ``` | `shift()` modifies the original array by removing the first element. In this example, `first` is `1`, and `arr` becomes `[2, 3]`.                                                                                                                                   |
| `concat()`           | Combines two or more arrays and returns a new array.                                                                         | ```javascript let arr1 = [1, 2]; let arr2 = [3, 4]; let combined = arr1.concat(arr2); ``` | `concat()` does not modify the original arrays but creates a new array containing elements from both `arr1` and `arr2`. In this example, `combined` is `[1, 2, 3, 4]`.                                                                                           |
| `join()`             | Combines all elements of an array into a string, separated by a specified separator, and returns the string.                | ```javascript let arr = ['apple', 'banana', 'cherry']; let str = arr.join(', '); ``` | `join()` does not modify the original array but creates a string by joining its elements with the specified separator. In this example, `str` is `'apple, banana, cherry'`.                                                                                |
| `slice()`            | Returns a shallow copy of a portion of an array into a new array, without modifying the original array.                   | ```javascript let arr = [1, 2, 3, 4, 5]; let sliced = arr.slice(1, 4); ``` | `slice()` does not modify the original array but creates a new array containing elements from index `1` to `4-1 = 3` (excluding `4`). In this example, `sliced` is `[2, 3, 4]`.                                                                                        |
| `splice()`           | Changes the contents of an array by removing, replacing, or adding elements and returns an array of the removed elements.   | ```javascript let arr = [1, 2, 3, 4, 5]; let removed = arr.splice(1, 2, 6, 7); ``` | `splice()` modifies the original array by removing two elements starting at index `1` and adding `6` and `7` in their place. It returns an array of the removed elements, which in this case is `[2, 3]`. The modified `arr` becomes `[1, 6, 7, 4, 5]`. |
| `forEach()`          | Executes a provided function once for each array element.                                                                    | ```javascript let arr = [1, 2, 3]; arr.forEach(item => console.log(item)); ``` | `forEach()` does not modify the original array but iterates over its elements and applies a function to each. In this example, it logs each element (`1`, `2`, `3`) to the console.                                                                                   |
| `map()`              | Creates a new array with the results of applying a provided function to each element of the original array.                | ```javascript let arr = [1, 2, 3]; let squared = arr.map(item => item * item); ``` | `map()` does not modify the original array but applies a function to each element and creates a new array with the results. In this example, `squared` is `[1, 4, 9]`.                                                                                             |
| `filter()`           | Creates a new array with all elements that pass a provided test (specified by a function).                                  | ```javascript let arr = [1, 2, 3, 4, 5]; let even = arr.filter(item => item % 2 === 0); ``` | `filter()` does not modify the original array but creates a new array containing elements that pass the specified test. In this example, `even` is `[2, 4]`.                                                                                                   |
| `reduce()`           | Applies a function to an accumulator and each element in the array (from left to right) to reduce it to a single value.    | ```javascript let arr = [1, 2, 3, 4, 5]; let sum = arr.reduce((acc, item) => acc + item, 0); ``` | `reduce()` does not modify the original array and is often used to accumulate a single value from its elements. In this example, `sum` is `15`, the sum of all elements.                                                                                   |
| `indexOf()`          | Returns the first index at which a specified element is found in an array, or -1 if not found.                              | ```javascript let arr = [1, 2, 3, 4, 5]; let index = arr.indexOf(3); ``` | `indexOf()` does not modify the array but returns the index of the specified element (`3` in this case). If not found, it returns `-1`. In this example, `index` is `2` (zero-based index).                                                                    |
| `includes()`         | Checks if an array includes a specified element and returns `true` or `false`.                                                | ```javascript let arr = [1, 2, 3, 4, 5]; let includes3 = arr.includes(3); ``` | `includes()` does not modify the array but checks if it contains the specified element (`3` in this case). It returns `true` if found and `false` otherwise. In this example, `includes3` is `true`.                                                               |
| `every()`            | Checks if all elements in an array pass a specified test (specified by a function) and returns `true` or `false`.          | ```javascript let arr = [2, 4, 6, 8, 10]; let allEven = arr.every(item => item % 2 === 0); ``` | `every()` does not modify the array and checks if all elements pass the specified test. It returns `true` if all elements meet the condition and `false` otherwise. In this example, `allEven` is `true`.                                                                |
| `some()`             | Checks if at least one element in an array passes a specified test (specified by a function) and returns `true` or `false`. | ```javascript let arr = [1, 3, 5, 7, 8]; let hasEven = arr.some(item => item % 2 === 0); ``` | `some()` does not modify the array and checks if at least one element passes the specified test. It returns `true` if found and `false` otherwise. In this example, `hasEven` is `true`.                                                                             |

**For higher order array methods (forEach, map, filter, reduce, every, somme), syntax is arr.forEach((item, index, array) => {})**

#### 2.Iterate: forEach
```javascript
// drawback of forEach function
const arr = [1,2,3]

const asyncFunc = (input) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    console.log({input})
    resolve(input)
  }, 2000)
  })
  
}

// in this code the for each loop doesn't wait until the promise is resolved, next iteration starts immediately
arr.forEach(async(item) => {
  console.log({item})
  let abc = await asyncFunc(item);
})

// o/p
{ item: 1 }
{ item: 2 }
{ item: 3 }
{ input: 1 }
{ input: 2 }
{ input: 3 }

// for loop is run one after the other, when one promise is resolved then go to the next iteration
(async () => {
for await (let item of arr) {
  console.log({item})
  let abc = await asyncFunc(item);
}
})();

// o/p
{ item: 1 }
{ input: 1 }
{ item: 2 }
{ input: 2 }
{ item: 3 }
{ input: 3 }


```

#### 3.Searching in array
1. arr.indexOf(item, from) – looks for item starting from index from, and returns the index where it was found, otherwise -1.
2. arr.lastIndexOf(item, from) – same, but looks for from right to left.
3. arr.includes(item, from) – looks for item starting from index from, returns true if found
4. find  
Imagine we have an array of objects. How do we find an object with the specific condition?
Here the arr.find(fn) method comes in handy.
```javascript
//syntax
let result = arr.find(function(item, index, array) {
  // if true is returned, item is returned and iteration is stopped
  // for falsy scenario returns undefined
});

//e.g.
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];
let user = users.find(item => item.id == 1);
alert(user.name); // John
```
5. filter
The find method looks for a single (first) element that makes the function return true.  
If there may be many, we can use arr.filter(fn).  
The syntax is similar to find, but filter returns an array of all matching elements:
```javascript
//syntax
let results = arr.filter(function(item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
});

// e.g.
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];
// returns array of the first two users
let someUsers = users.filter(item => item.id < 3);
alert(someUsers.length); // 2
```

#### 4.Transform an array
1. Map
The arr.map method is one of the most useful and often used.  
It calls the function for each element of the array and returns the array of results.
```javascript
//syntax
let result = arr.map(function(item, index, array) {
  // returns the new value instead of item
});

// e.g.
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```
2. Sort
```javascript
let arr = [ 1, 2, 15 ];
// the method reorders the content of arr
arr.sort();
alert( arr );  // 1, 15, 2
// The order became 1, 15, 2. Incorrect. But why?
// The items are sorted as strings by default.

//solution
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}
let arr = [ 1, 2, 15 ];
arr.sort(compareNumeric);
alert(arr);  // 1, 2, 15

// or
let arr = [ 1, 2, 15 ];
arr.sort(function(a, b) { return a - b; });
alert(arr);  // 1, 2, 15

//or
arr.sort( (a, b) => a - b );
```
3. reverse
```javascript
let arr = [1, 2, 3, 4, 5];
arr.reverse();
alert( arr ); // 5,4,3,2,1
```
4. split
```javascript
let names = 'Bilbo, Gandalf, Nazgul';
let arr = names.split(', ');
for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}

//split into letters
let str = "test";
alert( str.split('') ); // t,e,s,t

//join
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];
let str = arr.join(';'); // glue the array into a string using ;
alert( str ); // Bilbo;Gandalf;Nazgul
```
4. reduce/reduceRight
used to calculate a single value based on the array.
```javascript
//syntax
// The function is applied to all array elements one after another and “carries on” its result to the next call.
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
//accumulator – is the result of the previous function call, equals initial the first time (if initial is provided).
//item – is the current array item.
//index – is its position.
//array – is the array.

//e.g.
let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((sum, current) => sum + current, 0);
alert(result); // 15
//On the first run, sum is the initial value (the last argument of reduce), equals 0, and current is the first array element, equals 1. So the function result is 1.
// On the second run, sum = 1, we add the second array element (2) to it and return.
//On the 3rd run, sum = 3 and we add one more element to it, and so on…
// if inital value is omitted, then 1st item in array becomes initial, in above e.g. o/p would be same
//The method arr.reduceRight does the same, but goes from right to left.
```
filter, map, reduce and othere methods are also called as higher order array methods
#### 5.Array.isArray
Arrays are objects in JS
so
```javascript
alert(typeof {}); // object
alert(typeof []); // same

//
alert(Array.isArray({})); // false
alert(Array.isArray([])); // true
```
### Map and Set
#### Map
Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.  
Methods and properties are:
1. new Map() – creates the map.
2. map.set(key, value) – stores the value by the key.
3. map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
4. map.has(key) – returns true if the key exists, false otherwise.
5. map.delete(key) – removes the value by the key.
6. map.clear() – removes everything from the map.
7. map.size – returns the current element count.  

**Map vs obj**
1. The iteration goes in the same order as the values were inserted. Map preserves this order, unlike a regular Object. A for...in loop iterates over the properties of an object in an arbitrary order.
2. In obj, keys are always strings, in map datatype of keys can be anything see below e.g.  

```javascript
let map = new Map();
map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key
// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'
alert( map.size ); // 3

//Map can also use objects as keys.
let john = { name: "John" };
// for every user, let's store their visits count
let visitsCountMap = new Map();
// john is the key for the map
visitsCountMap.set(john, 123);
alert( visitsCountMap.get(john) ); // 123
// in obj, this is not possible
```

#### Iteration over Map
For looping over a map, there are 3 methods:

1. map.keys() – returns an iterable for keys,
2. map.values() – returns an iterable for values,
3. map.entries() – returns an iterable for entries [key, value], it’s used by default in for..of.

```javascript
//When a Map is created, we can pass an array (or another iterable) with key/value pairs for initialization
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);
// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}
// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}
// iterate over [key, value] entries
for (let entry of recipeMap) { // the same as of recipeMap.entries()
  alert(entry); // cucumber,500 (and so on)
}
// forEach
// runs the function for each (key, value) pair
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

#### Map from Object and vice versa
```javascript
// Map from object
let obj = {
  name: "John",
  age: 30
};
let map = new Map(Object.entries(obj));
alert( map.get('name') ); // John

//obj from Map
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);
// now prices = { banana: 1, orange: 2, meat: 4 }
alert(prices.orange); // 2
// why this needed
// we store the data in a Map, but we need to pass it to a 3rd-party code that expects a plain object.
```
#### Set
A Set is a special type collection – “set of values” (without keys), where each value may occur only once.

Its main methods are:

1. new Set(iterable) – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
2. set.add(value) – adds a value, returns the set itself.
3. set.delete(value) – removes the value, returns true if value existed at the moment of the call, otherwise false.
4. set.has(value) – returns true if the value exists in the set, otherwise false.
5. set.clear() – removes everything from the set.
6. set.size – is the elements count.
```javascript
let set = new Set();
let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };
// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);
// set keeps only unique values
alert( set.size ); // 3
```

##### Iteration over set
```javascript
let set = new Set(["oranges", "apples", "bananas"]);
for (let value of set) alert(value);
// the same with forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
// value & valueAgain, why?
// That’s for compatibility with Map where the callback passed forEach has three arguments. Looks a bit strange, for sure. But may help to replace Map with Set in certain cases with ease, and vice versa.

//to convert map keys/values or set in array use
Array.from(map.keys());
Array.fom(new Set(1,2));
```

#### WeakMap & WeakSet
As we know from the chapter Garbage collection, JavaScript engine stores a value in memory while it is reachable (and can potentially be used).  
```javascript
let john = { name: "John" };
// the object can be accessed, john is the reference to it
// overwrite the reference
john = null;
// the object will be removed from memory

//but for an object or elements of an array or another data structure are considered reachable and kept in memory
// while that data structure is in memory.
//For instance, if we put an object into an array, then while the array is alive, the object will be 
// alive as well, even if there are no other references to it.
//e.g
let john = { name: "John" };
let array = [ john ];
john = null; // overwrite the reference
// john is stored inside the array, so it won't be garbage-collected
// we can get it as array[0]
//e.g.2
let john = { name: "John" };
let map = new Map();
map.set(john, "...");
john = null; // overwrite the reference
// john is stored inside the map,
// we can get it by using map.keys()
```
WeakMap is fundamentally different in this aspect. It doesn’t prevent garbage-collection of key objects.  
The first difference from Map is that WeakMap keys must be objects, not primitive values:
```javascript
let weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, "ok"); // works fine (object key)
// can't use a string as the key
weakMap.set("test", "Whoops"); // Error, because "test" is not an object
```
In WeakMap, if we use an object as the key in it, and there are no other references to that object – it will be removed from memory (and from the map) automatically.
```javascript
let john = { name: "John" };
let weakMap = new WeakMap();
weakMap.set(john, "...");
john = null; // overwrite the reference
// john is removed from memory!
```
WeakMap does not support iteration and methods keys(), values(), entries(), so there’s no way to get all keys or values from it.  

WeakMap has only the following methods:
1. weakMap.get(key)
2. weakMap.set(key, value)
3. weakMap.delete(key)
4. weakMap.has(key)

##### When to use WeakMap
1. The main area of application for WeakMap is an additional data storage.
If we’re working with an object that “belongs” to another code, maybe even a third-party library, and would like to store some data associated with it, that should only exist while the object is alive – then WeakMap  
2. Caching
Another common example is caching: when a function result should be remembered (“cached”), so that future calls on the same object reuse it.
```javascript
//cache.js
let cache = new WeakMap();
// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;

    cache.set(obj, result);
  }
  return cache.get(obj);
}
// 📁 main.js
let obj = {/* some object */};
let result1 = process(obj);
let result2 = process(obj);
// ...later, when the object is not needed any more:
obj = null;
// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well
```

##### WeakSet
WeakSet behaves similarly:

1. It is analogous to Set, but we may only add objects to WeakSet (not primitives).
2. An object exists in the set while it is reachable from somewhere else.
3. Like Set, it supports add, has and delete, but not size, keys() and no iterations.
we can add users to WeakSet to keep track of those who visited our site:  
The most notable limitation of WeakMap and WeakSet is the absence of iterations, and inability to get all current content  

#### Transfroming objects (useful trick)
Objects lack many methods that exist for arrays, e.g. map, filter and others.

If we’d like to apply them, then we can use Object.entries followed by Object.fromEntries:

1. Use Object.entries(obj) to get an array of key/value pairs from obj.
2. Use array methods on that array, e.g. map.
3. Use Object.fromEntries(array) on the resulting array to turn it back into an object.
```javascript
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};
let doublePrices = Object.fromEntries(
  // convert to array, map, and then fromEntries gives back the object
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
alert(doublePrices.meat); // 8
```
For plain objects, the following methods are available:

1. Object.keys(obj) – returns an array of keys.
2. Object.values(obj) – returns an array of values.
3. Object.entries(obj) – returns an array of [key, value] pairs.

#### Destructuring assignment
Destructuring assignment is a special syntax that allows us to “unpack” arrays **or objects** into a bunch of variables
```javascript
// we have an array with the name and surname
let arr = ["Ilya", "Kantor"]
// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;
alert(firstName); // Ilya
alert(surname);  // Kantor

//ignoring elements with comma
// second element is not needed
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
alert( title ); // Consul

// works with any iterable
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);

//assigning to anything on left side
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');
alert(user.name); // Ilya

//looping with entries, same with Map
let user = {
  name: "John",
  age: 30
};
// loop over keys-and-values
for (let [key, value] of Object.entries(user)) {
  alert(`${key}:${value}`); // name:John, then age:30
}

//default values
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
alert(name);    // Julius (from array)
alert(surname); // Anonymous (default used)

//swap variable trick
let guest = "Jane";
let admin = "Pete";
// Swap values: make guest=Pete, admin=Jane
[guest, admin] = [admin, guest];
alert(`${guest} ${admin}`); // Pete Jane (successfully swapped!)
```

#### ...rest operator
applicable for objects as well
```javascript
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
alert(name1); // Julius
alert(name2); // Caesar
// Note that type of `rest` is Array.
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
```

##### Object destructuring
The destructuring assignment also works with objects.
```javascript
// syntax
let {var1, var2} = {var1:…, var2:…

//e.g.
let options = {
  title: "Menu",
  width: 100,
  height: 200
};
let {title, width, height} = options;
alert(title);  // Menu
alert(width);  // 100
alert(height); // 200

//
let title, width, height;
// error in this line
{title, width, height} = {title: "Menu", width: 200, height: 100};
//The problem is that JavaScript treats {...} in the main code flow (not inside another expression) as a code block
let title, width, height;
// okay now
({title, width, height} = {title: "Menu", width: 200, height: 100});
alert( title ); // Menu

//Nested destructuring
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};
// destructuring assignment split in multiple lines for clarity
let {
  size: { // put size here
    width,
    height
  },
  items: [item1, item2], // assign items here
  title = "Menu" // not present in the object (default value is used)
} = options;
alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

## Iterables
Iterable objects is a generalization of arrays. That’s a concept that allows us to make any object useable in a for..of loop.  
If an object isn’t technically an array, but represents a collection (list, set) of something, then for..of is a great syntax to loop over it  
```javascript
let range = {
  from: 1,
  to: 5
};

// We want the for..of to work:
// for(let num of range) ... num=1,2,3,4,5
// then use iterable

// iterable
let range = {
  from: 1,
  to: 5
};
// 1. call to for..of initially calls this
range[Symbol.iterator] = function() {
  // ...it returns the iterator object:
  // 2. Onward, for..of works only with this iterator, asking it for next values
  return {
    current: this.from,
    last: this.to,
    // 3. next() is called on each iteration by the for..of loop
    next() {
      // 4. it should return the value as an object {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};
// now it works!
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```
There’s a universal method Array.from that takes an iterable or array-like value and makes a “real” Array from it. Then we can call array methods on it.

#### Async iterables
1. Use Symbol.asyncIterator instead of Symbol.iterator.
2. The next() method should return a promise (to be fulfilled with the next value).
3. The async keyword handles it, we can simply make async next().
4. To iterate over such an object, we should use a for await (let item of iterable) loop
```javascript
let range = {
  from: 1,
  to: 5,
  [Symbol.asyncIterator]() { // (1)
    return {
      current: this.from,
      last: this.to,
      async next() { // (2)
        // note: we can use "await" inside the async next:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};
(async () => {
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
})()
```