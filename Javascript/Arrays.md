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
#### 1. Add/remove
**
1. arr.push(...items) – adds items to the end,
2. arr.pop() – extracts an item from the end,
3. arr.shift() – extracts an item from the beginning,
4. arr.unshift(...items) – adds items to the beginning.**
5. splice
```javascript
// It starts from the position index: removes deleteCount elements and then inserts elem1, ..., elemN at their place. Returns the array of removed elements.
// It can do everything: insert, remove and replace elements.
// syntax
arr.splice(index[, deleteCount, elem1, ..., elemN])

//e.g. 1 remove element
let arr = ["I", "study", "JavaScript"];
arr.splice(1, 1); // from index 1 remove 1 element
alert( arr ); // ["I", "JavaScript"]

// e.g 2, remove elements and replace with new ones
let arr = ["I", "study", "JavaScript", "right", "now"];
// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let's", "dance");
alert( arr ) // now ["Let's", "dance", "right", "now"]

// e.g. 3 get removed elements
let arr = ["I", "study", "JavaScript", "right", "now"];
// remove 2 first elements
let removed = arr.splice(0, 2);
alert( removed ); // "I", "study" <-- array of removed elements

// e.g. 4 add new elements without removing existing elements
let arr = ["I", "study", "JavaScript"];
// from index 2
// delete 0
// then insert "complex" and "language"
arr.splice(2, 0, "complex", "language");
alert( arr ); // "I", "study", "complex", "language", "JavaScript"

// e.g. 5 -ve index
let arr = [1, 2, 5];
// from index -1 (one step from the end)
// delete 0 elements,
// then insert 3 and 4
arr.splice(-1, 0, 3, 4);
alert( arr ); // 1,2,3,4,5

```
6. slice
```javascript
//It returns a new array copying to it all items from index start to end (not including end). Both start and end can be negative, in that case position from array end is assumed.
// syntax
arr.slice([start], [end])

//e.g.
let arr = ["t", "e", "s", "t"];
alert( arr.slice(1, 3) ); // e,s (copy from 1 to 3)
alert( arr.slice(-2) ); // s,t (copy from -2 till the end)
```
7. concat
```javascript
//The method arr.concat creates a new array that includes values from other arrays and additional items.
//syntax
arr.concat(arg1, arg2...)

//e.g
let arr = [1, 2];
// create an array from: arr and [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4
// create an array from: arr and [3,4] and [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6
// create an array from: arr and [3,4], then add values 5 and 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
```

#### 2.Iterate: forEach
```javascript
// to run a function for every element of the array
//syntax
arr.forEach(function(item, index, array) {
  // ... do something with item
});

// for each element call alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);

// e.g. 2
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
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

//but of an object or elements of an array or another data structure are considered reachable and kept in memory while that data structure is in memory.
//For instance, if we put an object into an array, then while the array is alive, the object will be alive as well, even if there are no other references to it.
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