## Javascript
Javascript is dynamically typed

## Javascript event loop. 
[Javascript event loop](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
Javascript event loop elements are  
1. Javascript Runtime (heap and stack)
2. Web Apis (DOM APIs, AJAX (n/w requests), setTimeout)
3. Task/callback queue 
4. ES6 Job Queue 

ES6 has new element **4. ES6 Job Queue** in addition to the **callback queue**    
It's a way to execute the result of an **async function** as soon as possible, rather than being put at the end of the call stack.  
Promises that resolve before the current function ends will be executed right after the current function.  
```javascript
const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
  console.log('foo')
  setTimeout(bar, 0)
  new Promise((resolve, reject) =>
    resolve('promise')
  ).then(resolve => console.log(resolve))
  baz()
}

foo()

//output in ES6         // output before ES6
// foo                   // foo
// baz                   // baz
// promise               // bar
// bar                   // promise
// because of job queue added in ES6
```

------------------------------------------------------------------------------
The old HTML standard, HTML4, required a script to have a type. Usually it was type="text/javascript". It’s not required anymore. Now, it is used for JavaScript modules.

#### Automatic semicolon insertion
A semicolon may be omitted in most cases when a line break exists.  
JavaScript interprets the line break as an “implicit” semicolon. This is called an automatic semicolon insertion.

In most cases, a newline implies a semicolon. But “in most cases” does not mean “always”!

There are cases when a newline does not mean a semicolon. For example:
alert(1  
+2)  

But there are situations where JavaScript “fails” to assume a semicolon where it is really needed.

```javascript
alert("There will be an error")

[1, 2].forEach(alert)
// Now if we run the code, only the first alert is shown and then we have an error!
// if semicolon is inserted after the 1st alert, it would work fine
// The error in the no-semicolon variant occurs because JavaScript does not assume a semicolon before square brackets [...]
```

------------------------------------------------------------------------------
#### The modern mode, "use strict"

```javascript
// note: no "use strict" in this example

num = 5; // the variable "num" is created if it didn't exist
// not declaring a variable makes it a global variable, no errors
alert(num); // 5

"use strict";

num = 5; // error: num is not defined
```

Modern JavaScript supports “classes” and “modules” – advanced language structures, that enable use strict automatically. So we don’t need to add the "use strict" directive, if we use them.  

------------------------------------------------------------------------------
#### Let, var, const

When the value of a constant is known prior to execution, name it with capital letters, when value is calculated during execution, use camelcase

```javascript
const COLOR_RED = "#F00";
const pageLoadTime = /* time taken by a webpage to load */;
```

------------------------------------------------------------------------------
#### Datatypes in JS
There are eight basic data types in JavaScript  
We can put any type in a variable  
```javascript
// no error
let message = "hello";
message = 123456;
```
Programming languages that allow such things, are called “dynamically typed”, meaning that there exist data types, but variables are not bound to any of them.  

1. **number** - for numbers of any kind: integer or floating-point, integers are limited by ±2(raise to 53).
2. **bigint** is for integer numbers of arbitrary length. A BigInt value is created by appending n to the end of an integer
3. **string** for strings. A string may have zero or more characters, there’s no separate single-character type.
4. **boolean** for true/false.
5. **null** for unknown values – a standalone type that has a single value null.
6. **undefined** for unassigned values – a standalone type that has a single value undefined.
7. **object** for more complex data structures.
8. **symbol** for unique identifiers.

The typeof operator allows us to see which type is stored in a variable.  
typeof x or typeof(x)  
Both are same 1st one is operator and later one is a function  

------------------------------------------------------------------------------
## Interaction: alert, prompt, confirm
```javascript
// 1 alert
alert("Hello");

// 2 prompt
// title - text to show to user
// default - default value
// result - i/p entered by user
result = prompt(title, [default]);

// 3 confirm
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true if OK is pressed
```


------------------------------------------------------------------------------
## Type Conversions
#### String Conversion
```javascript
let value = true;
alert(typeof value); // boolean

value = String(value); // now value is a string "true"
alert(typeof value); // string

alert(2 + 2 + '1' ); // "41" and not "221"
// Note that if any of the operands is a string, then the other one is converted to a string too
// The binary + is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.
alert( 6 - '2' ); // 4, converts '2' to a number
alert( '6' / '2' ); // 3, converts both operands to numbers
```

#### Numeric conversion
```javascript
// 1
alert( "6" / "2" ); // 3, strings are converted to numbers

// 2
let str = "123";
alert(typeof str); // string
let num = Number(str); // becomes a number 123
alert(typeof num); // number
// Explicit conversion is usually required when we read a value from a string-based source like a text form but expect a number to be entered.

// 3
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error reading a number at "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

#### Boolean conversion
```javascript
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

#### Strict equality
```javascript
alert( '' == false ); // true
// This happens because operands of different types are converted to numbers by the equality operator ==. An empty string, just like false, becomes a zero.  
// A strict equality operator === checks the equality without type conversion.
alert( 0 === false ); // false, because the types are different
```

#### Nullish coalescing operator '??'
The nullish coalescing operator ?? provides a short syntax for selecting a first “defined” variable from the list.  

The result of a ?? b is:  
a if it’s not null or undefined,  
b, otherwise.  
```javascript
// So, x = a ?? b is a short equivalent to
x = (a !== null && a !== undefined) ? a : b;

let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// show the first not-null/undefined value
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
```
**?? vs ||**
The important difference is that:  
|| returns the first truthy value.  
?? returns the first defined value.

#### Function as a value
Function in js is also treated as an object, thus you see below in js
```javascript
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// Call 1 -> usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);

// Call 2 -> anonymous functions
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```
Function declaration vs function expression -> see hoisting section

**Arrow functions**
```javascript
// variation 1
let sum = (a, b) => a + b;
alert(sum(1, 2)); // 3

// variation2 -> only 1 arg do not require curly braces, when 0 args it is required
let double = n => n * 2;
alert(double(3)); // 6

// variation 3 -> above 2 had 1 liner function body so no curly braces and also do not required return statement, the expression is returned
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
  return result; // if we use curly braces, then we need an explicit "return"
};

alert( sum(1, 2) ); // 3
```

------------------------------------------------------------------------------
## Hoisting
JavaScript’s behavior of moving declarations (variable and function) to the top of their current scope (function or global).  
1. Code is not moved but at compile time, variables and functions are put in memory (lexical scoping), before the execution pahse begins
2. Only the declaration is hoisted and not the initialization
```javascript
console.log(a); // undefined instead of error-> not declared
var a = 5;

// after hoisting
var a;
console.log(a);
a=5;
```
3. Function declaration is hoised and not function expression
```javascript
// function declaration
abc(); // ouptput abc
function abc() {
  console.log('abc');
}

// function expression
abc(); // error
var abc = function(defaultValue = 0) { //FYI -> adding default parameter in a function
  console.log('abc');
}
```

------------------------------------------------------------------------------
## Objects
Used to store keyed collections of various data and more complex entities  
```javascript
let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax

let user = {     // an object
  name: "John",  // by key "name" store value "John"
  age: 30        // by key "age" store value 30
};

// get property values of the object: using dot notation
alert( user.name ); // John
alert( user.age ); // 30

// adding new property
user.isAdmin = true;

// deleting existing property
delete user.age;

// adding mulriword property
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // multiword property name must be quoted
};

// an object declared as const can be modified.
const user = {
  name: "John"
};
user.name = "Pete"; // (*)
alert(user.name); // Pete
// The const would give an error only if we try to set user=... as a whole.
// There’s another way to make constant object properties

// get property values of the object: using square bracket notation
// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];

// multiword keys work only in square bracket notation and we can use variables in square bracket notation
let user = {
  name: "John",
  age: 30
};
let key = prompt("What do you want to know about the user?", "name");
// access by variable
alert( user[key] ); // John (if enter "name")

// Property value shorthand
// we often use existing variables as values for property names
function makeUser(name, age) {
  return {
    name: name,
    age: age,
  };
}
let user = makeUser("John", 30);
alert(user.name); // John

// We can use both normal properties and shorthands in the same object:
let user = {
  name,  // same as name:name
  age: 30
};

// Property existence test, “in” operator
// Reading a non-existing property just returns undefined. So we can easily test whether the property exists:
let user = {};
alert( user.noSuchProperty === undefined ); // true means "no such property"

//There’s also a special operator "in" for that.
// syntax -> note the quotes around the key
"key" in object

let user = { name: "John", age: 30 };
alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist

// undefined doesn't always work, but in does
let obj = {
  test: undefined
};
alert( obj.test ); // it's undefined, so - no such property?
alert( "test" in obj ); // true, the property does exist!

// for in loop for objects
for (key in object) {
  // executes the body for each key among object properties
}

// key order in object
// integer properties are sorted, others appear in creation order
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}

// if the keys are non-integer, then they are listed in the creation order
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // add one more
// non-integer properties are listed in the creation order
for (let prop in user) {
  alert( prop ); // name, surname, age
}

// Array is also an obj in js
```

#### Object copying, references
One of the fundamental differences of objects vs primitives is that they are stored and copied “by reference”.

Primitive values: strings, numbers, booleans – are assigned/copied “as a whole value”.

```javascript
let message = "Hello!";
let phrase = message;
// As a result we have two independent variables, each one is storing the string "Hello!".

// Objects are not like that.
// A variable stores not the object itself, but its “address in memory”, in other words “a reference” to it. simlar to pointers in C.

let user = { name: "John" };
let admin = user; // copy the reference 
admin.name = 'Pete'; // changed by the "admin" reference
alert(user.name); // 'Pete', changes are seen from the "user" reference

//objs comparison
let a = {};
let b = a; // copy the reference
alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true

let a = {};
let b = {}; // two independent objects
alert( a == b ); // false

// Cloning and merging, Object.assign
// if you need to copy obj to another variable
// can be done manually using for in loop and copying each key
// using Object.assign
Object.assign(dest, [src1, src2, src3...])  

let user = { name: "John" };
let permissions1 = { canView: true };
let permissions2 = { canEdit: true };
// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);
// now user = { name: "John", canView: true, canEdit: true }
// If the copied property name already exists, it gets overwritten:

// Object.assign does not work in nested cloning as in nested cloning obj contains another obj and the inner obj gets copied as reference
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};
let clone = Object.assign({}, user); // to create a new variable instead of same reference
alert( user.sizes === clone.sizes ); // true, same object
// user and clone share sizes
user.sizes.width++;       // change a property from one place
alert(clone.sizes.width); // 51, see the result from the other one

// to solve this use  _.cloneDeep(obj) from the JavaScript library lodash.
```

#### Garbage collection
The main concept of memory management in JavaScript is reachability.

“reachable” values are those that are accessible or usable somehow. They are guaranteed to be stored in memory.

```javascript
// user has a reference to the object
let user = {
  name: "John"
};
user = null;
// Now John becomes unreachable. There’s no way to access it, no references to it. Garbage collector will junk the data and free the memory.

let user = {
  name: "John"
};
let admin = user;
user = null
// Then the object is still reachable via admin global variable, so it’s in memory. If we overwrite admin too, then it can be removed.

// Interlinked objects
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;
  return {
    father: man,
    mother: woman
  }
}
let family = marry({
  name: "John"
}, {
  name: "Ann"
});
// resulting memory structure
```
![alt text](memorystructure.png "Title")

------------------------------------------------------------------------------


------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
## Callbacks, promises and async-await
#### Callbacks
Functions are objects in JS  
A callback function is a function that is passed as an argument to another function, to be “called back” at a later time. A function that accepts other functions as arguments is called a higher-order function, which contains the logic for when the callback function gets executed.  
```javascript
// passing annonymous function
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}

doHomework('math', function() {
  alert('Finished my homework');
});

// callback functions don’t always have to be defined in our function call

function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}
function alertFinished(){
  alert('Finished my homework');
}
doHomework('math', alertFinished);
```

**Callbacks can be synchronous and asynchronous**  
Above code is synchronous callback, if we call a callback inside settimeout then it is an asynchronous callback

##### But then why callback?
In the above code, alertFinished() can be called at last line of function doHomework(), then why to pass a callback?  
1. In this case callback is not required, but framework or library doesn't know the name of the function you'll want called after code is finished executing so passing the function you want called later as an argument i.e, callback is the option  
Example of filter
```javascript
let oddNumbers = numbers.filter(number => number % 2);
```
filter is an inbuit function, and you pass an anonymous function as an argument to filter function (this is a callback). so filter does it's thing and when it is done, it will call the callback (anonymous function passed), so filter does not know the function name but can execute it.  
Also JS libraries pass arguments to the callback  
In filter case, it passes number as an argument in our anonymous callback function  
Another eample -> 
```javascript
fs.readFile('demo.txt', (err, data) => { 
    console.log(data); 
 })

// so now you know where the err and data params are coming from
// second arg to readFile is a callback fn, and when readfile does it's thing, it calls our callback with the args, which contains file data
// usually err is passed as the frst argument in the callback function
```
2. JS in asynchronous and thus, you can pass the callbacks to ensure those are executed once the async code is run

##### Problem with callbacks
Callback hell -> It consists of multiple nested callbacks which makes code hard to read and debug.  
```javascript
var form = document.querySelector('form')
form.onsubmit = function (submitEvent) {
  var name = document.querySelector('input').value
  request({
    uri: "http://example.com/upload",
    body: name,
    method: "POST"
  }, function (err, response, body) {
    var statusMessage = document.querySelector('.status')
    if (err) return statusMessage.value = err
    statusMessage.value = body
  })
}
```
Myth -> Promises are used to prevent callback hell, so use promises  
Truth -> You don't need promises or async-await to perevent callback hell  

Callback hell can be prevented as follows for above code
1. keep your code shallow  
provide names to unnecessary anonymous functions and separate them out
```javascript
document.querySelector('form').onsubmit = formSubmit

function formSubmit (submitEvent) {
  var name = document.querySelector('input').value
  request({
    uri: "http://example.com/upload",
    body: name,
    method: "POST"
  }, postResponse)
}

function postResponse (err, response, body) {
  var statusMessage = document.querySelector('.status')
  if (err) return statusMessage.value = err
  statusMessage.value = body
}
```  
2. Modularize your code
Move functions to different modules, then import and use them
```javascript
var formUploader = require('formuploader')
document.querySelector('form').onsubmit = formUploader.submit
```
Summary
1. Don't nest functions. 
2. Give them names and place them at the top level of your program
3. Use function hoisting to your advantage to move functions 'below the fold'

#### Promises
A promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it’s not resolved (e.g., a network error occurred). A promise may be in one of 3 possible states: fulfilled, rejected, or pending.

3 possible states:
1. Fulfilled: onFulfilled() will be called (e.g., resolve() was called)
2. Rejected: onRejected() will be called (e.g., reject() was called)
3. Pending: not yet fulfilled or rejected  
4. Settled: promise is either fulfilled or rejected

E.g.
```javascript
   function add_positivenos_async(n1, n2) {
      let p = new Promise(function (resolve, reject) {
         if (n1 >= 0 && n2 >= 0) {
            //do some complex time consuming work
            resolve(n1 + n2)
         }
         else
            reject('NOT_Postive_Number_Passed')
      })
      return p;
   }

   add_positivenos_async(10,20)
   .then(function(result){
      console.log("first result",result)
      return add_positivenos_async(result,result)
   }).then(function(result){
   console.log("second result",result)
      return add_positivenos_async(result,result)
   }).then(function(result){
      console.log("third result",result)
   })

   console.log('end')

//O/p
//end
//first result 30
//second result 60
//third result 120
```

###### Promise methods
1. Promise.all()
Syntax-> Promise.all(iterable);  
Wait for all promises to be resolved, or for any to be rejected.
E.g. 
```javascript
function add_positivenos_async(n1, n2) {
      let p = new Promise(function (resolve, reject) {
         if (n1 >= 0 && n2 >= 0) {
            //do some complex time consuming work
            resolve(n1 + n2)
         }
         else
            reject('NOT_Postive_Number_Passed')
      })

      return p;
   }
   //Promise.all(iterable)

Promise.all([add_positivenos_async(10,20),add_positivenos_async(30,40),add_positivenos_async(50,60)])
   .then(function(resolveValue){
      console.log(resolveValue[0])
      console.log(resolveValue[1])
      console.log(resolveValue[2])
      console.log('all add operations done')
   })
   .catch(function(err){
      console.log('Error',err)
   })
   console.log('end')
```
2. Promise.allSettled()
Syntax-> Promise.allSettled(iterable);  
Wait until all promises have settled (each may resolve or reject)  

Promise.all() vs Promise.allSettled()
1. Promise.all() rejects as soon as a promise within the iterable object rejected.
2. Promise.allSettled() resolves regardless of rejected promise(s) within the iterable object.  

3. Promise.race()
Syntax-> Promise.race(iterable);  
Wait until any of the promises is resolved or rejected.
If the returned promise resolves, it is resolved with the value of the first promise in the iterable that resolved.
If it rejects, it is rejected with the reason from the first promise that was rejected. 

4. Promise.any()
Syntax-> Promise.any(iterable);  

Promise.any() resolves with the first promise to fulfil, even if a promise rejects first. This is in contrast to Promise.race(), which resolves or rejects with the first promise to settle.  

Promise.race() vs Promise.any()
Promise.race() -> retruns 1st promise that is settled (resolved/rejected)  
Promise.any() -> returns 1st promise that is fulfilled (resolved), even if earlier promises are rejected, it would return the 1st one that is fulfilled (resolved)  

When a .then() lacks the appropriate function, processing simply continues to the next link of the chain.   Therefore, a chain can safely omit every handleRejection until the final .catch().  Similarly, .catch() is really just a .then() without a slot for handleFulfilled.

------------------------------------------------------------------------------
#### Async/Await
##### Async
There’s a special syntax to work with promises in a more comfortable fashion, called “async/await”. It’s surprisingly easy to understand and use.  
The word “async” before a function means one simple thing: a function always returns a promise.  

```javascript
async function f() {
  return 1;
}

f().then(alert); // 1

//We could explicitly return a promise, which would be the same

async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

**So, async ensures that the function returns a promise, and wraps non-promises in it**  
in above e.g. we are returning 1 which is non-promise object, so async wraps promise around it.  

##### Await
The keyword await makes JavaScript wait until that promise settles and returns its result.

```javascript
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```

**Caution**
1. await won’t work in the top-level code
```javascript
// syntax error in top-level code
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

//FIX
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------




TODO-
array methods
ES6
IIFE
Automated testing with mocha = jsinfo
