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
| **Modification Methods** | Methods that modify the original array. |
| `push()`             | Adds one or more elements to the end of an array and returns the new length.                                                   | ```javascript let arr = [1, 2, 3]; arr.push(4, 5); ``` | `push()` modifies the original array by adding elements to its end. In this example, `arr` becomes `[1, 2, 3, 4, 5]`.                                                                                                                                               |
| `pop()`              | Removes and returns the last element from an array.                                                                           | ```javascript let arr = [1, 2, 3]; let last = arr.pop(); ``` | `pop()` modifies the original array by removing the last element. In this example, `last` is `3`, and `arr` becomes `[1, 2]`.                                                                                                                                     |
| `unshift()`          | Adds one or more elements to the beginning of an array and returns the new length.                                           | ```javascript let arr = [2, 3]; arr.unshift(0, 1); ``` | `unshift()` modifies the original array by adding elements to its beginning. In this example, `arr` becomes `[0, 1, 2, 3]`.                                                                                                                                       |
| `shift()`            | Removes and returns the first element from an array.                                                                         | ```javascript let arr = [1, 2, 3]; let first = arr.shift(); ``` | `shift()` modifies the original array by removing the first element. In this example, `first` is `1`, and `arr` becomes `[2, 3]`.                                                                                                                                   |
| `splice()`           | Changes the contents of an array by removing, replacing, or adding elements and returns an array of the removed elements.   | ```javascript let arr = [1, 2, 3, 4, 5]; let removed = arr.splice(1, 2, 6, 7); ``` | `splice()` modifies the original array by removing two elements starting at index `1` and adding `6` and `7` in their place. It returns an array of the removed elements, which in this case is `[2, 3]`. The modified `arr` becomes `[1, 6, 7, 4, 5]`. |
| `sort()`             | Sorts the elements of an array in place and returns the sorted array.                                                          | ```javascript let arr = [3, 1, 2]; arr.sort(); ``` | `sort()` modifies the original array by arranging its elements in ascending order. In this example, `arr` becomes `[1, 2, 3]`.                                                                                                                                     |
| `reverse()`          | Reverses the order of elements in an array in place and returns the reversed array.                                             | ```javascript let arr = [1, 2, 3]; arr.reverse(); ``` | `reverse()` modifies the original array by reversing the order of its elements. In this example, `arr` becomes `[3, 2, 1]`.                                                                                                                                    |
| **Non-Modification Methods** | Methods that do not modify the original array but return a new array or value. |
| `concat()`           | Combines two or more arrays and returns a new array.                                                                         | ```javascript let arr1 = [1, 2]; let arr2 = [3, 4]; let combined = arr1.concat(arr2); ``` | `concat()` does not modify the original arrays but creates a new array containing elements from both `arr1` and `arr2`. In this example, `combined` is `[1, 2, 3, 4]`.                                                                                           |
| `join()`             | Combines all elements of an array into a string, separated by a specified separator, and returns the string.                | ```javascript let arr = ['apple', 'banana', 'cherry']; let str = arr.join(', '); ``` | `join()` does not modify the original array but creates a string by joining its elements with the specified separator. In this example, `str` is `'apple, banana, cherry'`.                                                                                |
| `slice()`            | Returns a shallow copy of a portion of an array into a new array, without modifying the original array.                   | ```javascript let arr = [1, 2, 3, 4, 5]; let sliced = arr.slice(1, 4); ``` | `slice()` does not modify the original array but creates a new array containing elements from index `1` to `4-1 = 3` (excluding `4`). In this example, `sliced` is `[2, 3, 4]`.                                                                                        |
| `map()`              | Creates a new array with the results of applying a provided function to each element of the original array.                | ```javascript let arr = [1, 2, 3]; let squared = arr.map(item => item * item); ``` | `map()` does not modify the original array but applies a function to each element and creates a new array with the results. In this example, `squared` is `[1, 4, 9]`.                                                                                             |
| `filter()`           | Creates a new array with all elements that pass a provided test (specified by a function).                                  | ```javascript let arr = [1, 2, 3, 4, 5]; let even = arr.filter(item => item % 2 === 0); ``` | `filter()` does not modify the original array but creates a new array containing elements that pass the specified test. In this example, `even` is `[2, 4]`.                                                                                                   |
| `reduce()`           | Applies a function to an accumulator and each element in the array (from left to right) to reduce it to a single value.    | ```javascript let arr = [1, 2, 3, 4, 5]; let sum = arr.reduce((acc, item) => acc + item, 0); ``` | `reduce()` does not modify the original array and is often used to accumulate a single value from its elements. In this example, `sum` is `15`, the sum of all elements.                   |
| `indexOf()`          | Returns the first index at which a specified element is found in an array, or -1 if not found.                              | ```javascript let arr = [1, 2, 3, 4, 5]; let index = arr.indexOf(3); ``` | `indexOf()` does not modify the array but returns the index of the specified element (`3` in this case). If not found, it returns `-1`. In this example, `index` is `2` (zero-based index).                                                                    |
| `includes()`         | Checks if an array includes a specified element and returns `true` or `false`.                                                | ```javascript let arr = [1, 2, 3, 4, 5]; let includes3 = arr.includes(3); ``` | `includes()` does not modify the array but checks if it contains the specified element (`3` in this case). It returns `true` if found and `false` otherwise. In this example, `includes3` is `true`.                                                               |
| `every()`            | Checks if all elements in an array pass a specified test (specified by a function) and returns `true` or `false`.          | ```javascript let arr = [2, 4, 6, 8, 10]; let allEven = arr.every(item => item % 2 === 0); ``` | `every()` does not modify the array and checks if all elements pass the specified test. It returns `true` if all elements meet the condition and `false` otherwise. In this example, `allEven` is `true`.                                                                |
| `some()`             | Checks if at least one element in an array passes a specified test (specified by a function) and returns `true` or `false`. | ```javascript let arr = [1, 3, 5, 7, 8]; let hasEven = arr.some(item => item % 2 === 0); ``` | `some()` does not modify the array and checks if at least one element passes the specified test. It returns `true` if found and `false` otherwise. In this example, `hasEven` is `true`.                                                                             |
| `find()`             | Returns the first element in an array that satisfies a provided test (specified by a function) or `undefined` if not found. | ```javascript let arr = [1, 2, 3, 4, 5]; let even = arr.find(item => item % 2 === 0); ``` | `find()` does not modify the array but returns the first element that satisfies the specified test (`2` in this case). If not found, it returns `undefined`. In this example, `even` is `2`.                                                                       |
| `sort()`             | Sorts the elements of an array in place and returns the sorted array.                                                          | ```javascript let arr = [3, 1, 2]; arr.sort(); ``` | `sort()` modifies the original array by arranging its elements in ascending order. In this example, `arr` becomes `[1, 2, 3]`.                                                                                                                                     |
| `split()`            | Splits a string into an array of substrings based on a specified separator and returns the array.                         | ```javascript let str = 'apple,banana,cherry'; let arr = str.split(','); ``` | `split()` does not modify the original string but creates an array by splitting the string into substrings using the specified separator. In this example, `arr` is `['apple', 'banana', 'cherry']`.                                                                    |
| `reverse()`          | Reverses the order of elements in an array in place and returns the reversed array.                                             | ```javascript let arr = [1, 2, 3]; arr.reverse(); ``` | `reverse()` modifies the original array by reversing the order of its elements. In this example, `arr` becomes `[3, 2, 1]`.                                                                                                                                    |
                                                                          |

**For higher order array methods (forEach, map, filter, reduce, every, somme, find), syntax is arr.forEach((item, index, array) => {})**

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

#### 4.Transform an array
1. Sort
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
| **Aspect**          | **Description**                                                                                                                                         |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| **What is a Map?** | A `Map` is a built-in data structure that allows you to store key-value pairs. Unlike objects, `Map` keys can be of any data type.            |
| **Difference from Objects** | - Objects have limitations on key types (only strings or Symbols), while `Map` keys can be any data type. - `Map` maintains the order of key-value pairs, which is not guaranteed in objects. |
| **Creating a Map** | ```const myMap = new Map(); ```                                                                                                            |
| **Setting Key-Value Pairs** | ```myMap.set('name', 'John'); myMap.set(1, 'One'); myMap.set({}, 'Object'); ```                                                             |
| **Getting a Value** | ```const name = myMap.get('name'); // 'John' const one = myMap.get(1); // 'One' const objValue = myMap.get({}); // 'Object' (Note: Object reference matters) ``` |
| **Checking for Key Existence** | ```const hasName = myMap.has('name'); // true const hasAge = myMap.has('age'); // false ``` |
| **Deleting a Key-Value Pair** | ```myMap.delete('name'); // Removes the 'name' key-value pair ``` |
| **Getting the Size** | ```const size = myMap.size; // 2 (after deleting 'name') ``` |
| **Iterating through Keys and Values (forEach)** | ```myMap.forEach((value, key) => { console.log(`${key}: ${value}`); }); ``` |
| **Iterating through Keys (for...of)** | ```for (const key of myMap.keys()) { console.log(key); } ``` |
| **Iterating through Values (for...of)** | ```for (const value of myMap.values()) { console.log(value); } ``` |
| **Iterating through Entries (for...of)** | ```for (const [key, value] of myMap.entries()) { console.log(`${key}: ${value}`); } ``` |
| **Iterating through Entries (using destructuring)** | ```for (const [key, value] of myMap) { console.log(`${key}: ${value}`); } ``` |
| **Clearing the Map** | ```myMap.clear(); // Removes all key-value pairs ``` |


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

| **Aspect**          | **Description**                                                                                                                                             |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **What is a Set?** | A `Set` is a built-in data structure that allows you to store unique values of any data type, eliminating duplicates.                                      |
| **Creating a Set** | ```const mySet = new Set(); ```                                                                                                                           |
| **Adding Values**  | ```mySet.add('apple'); mySet.add('banana'); mySet.add('cherry'); ```                                                                                       |
| **Checking for Value Existence** | ```const hasApple = mySet.has('apple'); // true const hasGrape = mySet.has('grape'); // false ``` |
| **Deleting a Value** | ```mySet.delete('apple'); // Removes 'apple' from the set ``` |
| **Getting the Size** | ```const size = mySet.size; // 2 (after deleting 'apple') ``` |
| **Iterating through Values (forEach)** | ```mySet.forEach(value => { console.log(value); }); ``` |
| **Iterating through Values (for...of)** | ```for (const value of mySet) { console.log(value); } ``` |
| **Clearing the Set** | ```mySet.clear(); // Removes all values from the set ``` |

In summary, a `Set` is a data structure for storing unique values of any data type. It automatically eliminates duplicates and provides various methods for working with these values.


In summary, a `Set` in JavaScript is a data structure for storing unique values of any data type. It automatically eliminates duplicates and provides various methods for working with these values.


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
let {var1, var2} = {var1:…, var2:…}

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
An iterable is an object in JavaScript that has an associated iterable protocol, which defines how elements are accessed or iterated over in a specific order. Iterables include arrays, strings, maps, sets, and more. They enable you to loop or iterate through their elements one by one

#### converting object to iterables
```javascript
const person = {
    name: 'John',
    age: 30,
    city: 'New York'
};

const entriesIterable = Object.entries(person);

for (const [key, value] of entriesIterable) {
    console.log(`${key}: ${value}`);
}

// Output:
// name: John
// age: 30
// city: New York

```

To convert an object to an iterable without using any built-in Object methods, you can create a custom iterator for the object. This involves defining a custom iterable protocol using the Symbol.iterator symbol. 
```javascript
// Custom object with properties
const customObject = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3'
};

// Define a custom iterator for the object
// We define a custom iterator for the customObject by assigning a function to the Symbol.iterator property of the object.
customObject[Symbol.iterator] = function () {
    const keys = Object.keys(this);
    let index = 0;

    // The next() function returns an object with value and done properties
    return {
      // this next method is required by the iterator protocol
        next: () => {
            if (index < keys.length) {
                const key = keys[index++];
                return { value: [key, this[key]], done: false };
            } else {
                return { done: true };
            }
        }
    };
};

// Iterate through the customObject using a for...of loop
for (const [key, value] of customObject) {
    console.log(`Property: ${key}, Value: ${value}`);
}

// 
// We initialize an index variable to keep track of the current key being processed.
```

**Usecase of iterables**
| Scenario                | Description                                                                                                                                                                                                                                                                                                                              |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Custom Data Structures** | If you've created custom data structures or objects that don't naturally support iteration, a custom iterator can provide a way to traverse and work with the data within those structures.                                                                                                                                              |
| **Complex Data Transformation** | When you need to perform complex data transformations or filtering on an object's properties, a custom iterator allows you to define exactly how the iteration process should work.                                                                                                                                                        |
| **Asynchronous Operations** | If you're dealing with asynchronous operations within the iterator, such as fetching data from external sources, you can encapsulate the logic for handling these operations within the custom iterator.                                                                                                                                  |
| **Specific Iteration Order** | When the order in which you want to iterate through object properties matters, a custom iterator can enforce that order.                                                                                                                                                                                                                 |
| **Custom Iteration Logic** | If you need to implement custom iteration logic that goes beyond what standard iteration methods (`Object.keys()`, `Object.values()`, etc.) can provide, a custom iterator allows you to define your own rules.                                                                                                                         |

Keep in mind that JavaScript's built-in objects and data structures (arrays, maps, sets, etc.) are already iterable by default, and you may not need custom iterators for most common use cases. Custom iterators are typically used when working with user-defined or specialized data structures.

#### Example 1. Making custom data structure (class) iterable
```javascript
// Define a custom data structure called CustomList.
class CustomList {
    constructor() {
        this.items = [];
    }
    // Add items to the CustomList.
    add(item) {
        this.items.push(item);
    }
    // Define a custom iterator method for the CustomList.
    [Symbol.iterator]() {
        let index = 0;
        // Return an object with a next() method.
        return {
            next: () => {
                if (index < this.items.length) {
                    // If there are more items, return the next item.
                    return { value: this.items[index++], done: false };
                } else {
                    // If all items have been iterated, indicate completion.
                    return { done: true };
                }
            }
        };
    }
}
// Create an instance of the CustomList.
const myList = new CustomList();
// Add items to the CustomList.
myList.add('Item 1');
myList.add('Item 2');
myList.add('Item 3');
// Use a for...of loop to iterate through the CustomList.
for (const item of myList) {
    console.log(item);
}

```

#### Example 2. COmplex example of making custom data structure iterable
```javascript
class SocialNetwork {
    constructor() {
        this.users = new Map(); // Map to store users and their friendships.
    }
    // Add a user to the social network.
    addUser(username) {
        if (!this.users.has(username)) {
            this.users.set(username, new Set()); // Initialize an empty friend set.
        }
    }
    // Add a friendship between two users.
    addFriendship(userA, userB) {
        if (this.users.has(userA) && this.users.has(userB)) {
            this.users.get(userA).add(userB);
            this.users.get(userB).add(userA);
        }
    }
    // Define a custom iterator to traverse through users and their friendships.
    [Symbol.iterator]() {
        const users = Array.from(this.users.keys());
        let index = 0;

        return {
            next: () => {
                if (index < users.length) {
                    const user = users[index++];
                    const friendships = Array.from(this.users.get(user));
                    return { value: { user, friendships }, done: false };
                } else {
                    return { done: true };
                }
            },
        };
    }
}
// Create a social network.
const mySocialNetwork = new SocialNetwork();
// Add users and friendships.
mySocialNetwork.addUser('Alice');
mySocialNetwork.addUser('Bob');
mySocialNetwork.addUser('Charlie');
mySocialNetwork.addFriendship('Alice', 'Bob');
mySocialNetwork.addFriendship('Bob', 'Charlie');
// Use a for...of loop to iterate through users and their friendships in the social network.
for (const { user, friendships } of mySocialNetwork) {
    console.log(`User: ${user}`);
    console.log(`Friendships: ${[...friendships].join(', ')}`);
    console.log('---');
}

//output - 
User: Alice
Friendships: Bob
---
User: Bob
Friendships: Alice, Charlie
---
User: Charlie
Friendships: Bob
---
```
#### Example 2.  Async operation real-life example
```javascript
// Create an array of URLs to fetch data from (simulated asynchronous operations).
const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
];

// Define a custom asynchronous iterable object with an async iterator method.
const asyncIterable = {
    [Symbol.asyncIterator]() {
        let index = 0;

        // Return an object with a next() method.
        return {
            async next() {
                if (index < urls.length) {
                    const url = urls[index];
                    index++;

                    // Simulate fetching data asynchronously from the URL.
                    const response = await fetch(url);
                    const data = await response.json();

                    // Return the fetched data.
                    return { value: data, done: false };
                } else {
                    // All iterations are done.
                    return { done: true };
                }
            }
        };
    }
};

// Use a for await...of loop to iterate through and process the data.
(async () => {
    for await (const item of asyncIterable) {
        console.log(item);
    }
})();

```