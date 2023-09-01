## Javascript

| Javascript is        | Description                                                                                   |
|----------------------|-----------------------------------------------------------------------------------------------|
| Dynamically Typed    | JavaScript is dynamically typed, allowing the same variable to be assigned multiple datatypes.|
| Object-Oriented      | JavaScript is an object-oriented language, allowing the creation and manipulation of objects.|
| Scripting Language   | JavaScript is a scripting language used in a special runtime environment, often the browser, for automating task execution. |
| Both compiled and interpreted Language   | It is primarily interpreted, but some modern JavaScript engines use just-in-time compilation for performance optimization. Hoisting works because of compilation feature|

## Javascript event loop

[Javascript event loop](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
Web browser is made up of -  

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

| Keyword | Scope                        | Hoisting | Reassignment | Block Scope | Can Be Redeclared |
|---------|------------------------------|----------|--------------|-------------|-------------------|
| `var`   | Function or Global           | Yes      | Yes          | No          | Yes               |
| `let`   | Block (Local)                | Yes      | Yes          | Yes         | No                |
| `const` | Block (Local)                | Yes      | No           | Yes         | No                |


##### IIFE Immediately invoked function expression

```javascript
(function() {
  var foo = "bar";
  console.log(foo);
})();
```

**use of IIFE**
As in the past there was only var, and it has no block-level visibility, programmers invented a way to emulate it.
Local variables declared using the var keyword are scoped to the enclosing function. If no such function exists, the variables will be created as global variables instead, thus polluting the global scope. To prevent this, we can use an IIFE to create a function wrapper for local variables  
nowadays there’s no reason to use IIFE.

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
| Data Type   | Description                                       | Example                                  |
|-------------|---------------------------------------------------|------------------------------------------|
| `undefined` | Represents an uninitialized or missing value.    | `let x;`                                 |
| `null`      | Represents an intentional absence of any object. | `let y = null;`                          |
| `boolean`   | Represents a binary value, `true` or `false`.    | `let isTrue = true;`                     |
| `number`    | Represents numeric values, including integers and floating-point numbers. | `let age = 30;` or `let price = 19.99;` |
| `string`    | Represents textual data, enclosed in single or double quotes. | `let name = 'John';` |
| `symbol`    | Represents unique and immutable values, often used as object property keys. | `const uniqueKey = Symbol();` |
| `bigint`    | Represents large integers, supporting arbitrary precision. | `const bigNumber = 1234567890123456789012345678901234567890n;` |
| `object`    | Represents a collection of key-value pairs, including arrays, functions, and objects. | `let person = { name: 'Alice', age: 25 };` |
| `function`  | Represents a reusable block of code that can be called. | `function greet() { console.log('Hello!'); }` |


| Feature            | Description                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| **Data Type**      | `symbol`                                                                                           |
| **Description**    | Represents unique and immutable values.                                                            |
| **How to Use**     | Create symbols using the `Symbol()` constructor or the shorthand notation `Symbol(description)`. |
| **When to Use**    | Use symbols when you need guaranteed unique values, typically as object property keys.            |
| **Example**        | ```javascript const uniqueKey = Symbol('unique'); const obj = {}; obj[uniqueKey] = 'some value'; ``` |
| **Why to Use**     | Symbols ensure property keys are unique, preventing unintended overwrites or conflicts in objects. They are often used in scenarios where property names need to be unique, such as when creating custom methods or metadata in objects. Or when dealing with objects from external libraries |


------------------------------------------------------------------------------

## Type Conversions
| Conversion Type           | Description                                        | Examples                            | Outputs     |
|---------------------------|----------------------------------------------------|-------------------------------------|-------------|
| **Implicit Coercion**    | Automatic type conversion by JavaScript.          | `5 + '5';`                          | `'55'`      |
| **                       |                                                    | `true + 1;`                        | `2`         |
| **                       |                                                    | `'5' * 2;`                         | `10`        |
| **Explicit Conversion**   | Converting between types using functions/methods. | `Number('5');`                      | `5`         |
| **                       |                                                    | `String(42);`                       | `'42'`      |
| **                       |                                                    | `Boolean(0);`                       | `false`     |
| **Truthy/Falsy Values**   | Implicit boolean conversion in conditions.        | `if ('Hello') { /* code */ }`       | `true`      |
| **                       |                                                    | `if (0) { /* code */ }`             | `false`     |
| **                       |                                                    | `!!'Hello';`                        | `true`      |
| **String to Number**     | Converting a string to a number.                 | `parseInt('10');`                   | `10`        |
| **                       |                                                    | `parseFloat('10.5');`               | `10.5`      |
| **                       |                                                    | `Number('ABC');`                    | `NaN`       |
| **Number to String**     | Converting a number to a string.                 | `String(42);`                       | `'42'`      |
| **                       |                                                    | `(42).toString();`                  | `'42'`      |
| **                       |                                                    | `(3.14).toFixed(2);`                | `'3.14'`    |
| **Boolean to Number**    | Converting a boolean to a number.                | `Number(true);`                     | `1`         |
| **                       |                                                    | `Number(false);`                    | `0`         |
| **Number to Boolean**    | Converting a number to a boolean.                | `Boolean(0);`                       | `false`     |
| **                       |                                                    | `Boolean(42);`                      | `true`      |
| **String to Boolean**    | Converting a string to a boolean.                | `Boolean('false');`                 | `true`      |
| **                       |                                                    | `Boolean('');`                      | `false`     |
| **Object to Primitive**  | Converting an object to a primitive value.      | `let obj = { valueOf: () => 42 }; +obj;` | `42`    |
| **                       |                                                    | `let obj = { toString: () => 'Hello' }; String(obj);` | `'Hello'` |
| **                       |                                                    | `let obj = { [Symbol.toPrimitive]: () => 'Custom' }; +obj;` | `'Custom'` |

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

## Closure

- **Definition  (function with its lexical env)**
Closure is created when a child function keep the environment of the parent scope even after the parent function has already executed

```javascript
function foo(outer_arg) { 
    function inner(inner_arg) { 
        return outer_arg + inner_arg; 
    } 
    return inner; 
} 
var get_func_inner = foo(5); 
console.log(get_func_inner(4)); //outputs 9
console.log(get_func_inner(3)); //outputs 8
```

We can access the variable outer_arg (value 5) which is defined in function foo() through function inner() as the later preserves the scope chain of enclosing function at the time of execution of enclosing function i.e. the inner function knows the value of outer_arg through it’s scope chain.
This is closure in action that is inner function can have access to the outer function variables as well as all the global variables.

```javascript
// another example
function outer()  
{ 
    var arr = []; 
    var i; 
    for (i = 0; i < 4; i++)  
    { 
        // storing anonymus function 
        arr[i] = function () { return i; } 
    }  
    // returning the array. 
    return arr; 
}
var get_arr = outer(); 
console.log(get_arr[0]());  // 4
console.log(get_arr[1]());  // 4
console.log(get_arr[2]());  // 4
console.log(get_arr[3]());  // 4
// due to closure
```

**Use case**  

1. To create private functions/variables  

```javascript
a = (function () {
    var privatefunction = function () {
        alert('hello');
    }
    return {
        publicfunction : function () {
            privatefunction();
        }
    }
})();
```  

As you can see there, a is now an object, with a method publicfunction ( a.publicfunction() ) which calls privatefunction, which only exists inside the closure. You can NOT call privatefunction directly (i.e. a.privatefunction() ), just publicfunction()

2. Debouncung
3. Throttling

Disadvantage of closure - memory consumption sue to variable in scope

------------------------------------------------------------------------------

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

![alt text](PNG/memorystructure.PNG "Title")

```javascript
delete family.father;
delete family.mother.husband;
// Outgoing references do not matter. Only incoming ones can make an object reachable. So, John is now unreachable and will be removed from the memory with all its data that also became unaccessible
```

Idle-time collection – the garbage collector tries to run only while the CPU is idle, to reduce the possible effect on the execution.

------------------------------------------------------------------------------

## Modules

A module is just a file. One script is one module. As simple as that.

```javascript
//import export
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
import {sayHi} from './sayHi.js';
alert(sayHi); // function...
sayHi('John'); // Hello, John!

//more export examples
// 1. Export before declarations
// export an array
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;
// export a class
export class User {
  constructor(name) {
    this.name = name;
  }
}

// 2. Export apart from declarations
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}
function sayBye(user) {
  alert(`Bye, ${user}!`);
}
export {sayHi, sayBye}; // a list of exported variables

// 3. export as
export {sayHi as hi, sayBye as bye};
import * as say from './say.js';

// 4. Export default
// In practice, there are mainly two kinds of modules.
// 1. Modules that contain a library, pack of functions, like say.js above.
// 2. Modules that declare a single entity, e.g. a module user.js exports only class User.
// Mostly, the second approach is preferred, so that every “thing” resides in its own module.
//Modules provide a special export default
// 📁 user.js
// with default name can be skopped
export default class User { // just add "default"
  constructor(name) {
    this.name = name;
  }
}
// and then import it without curly braces
// 📁 main.js
// in imoport nay name can be given, but always give the name as class name
// as multiple devs can give diff. name and cause confustion
import User from './user.js'; // not {User}, just User

new User('John');
// there can only be one export default per module
// we can use default with named exports (see above) as well 

//Named export                                 Default export
//export class User {...}                      export default class User {...}
//import {User} from ...                       import User from ...

**Dynamic imports**
// using The import() expression
// The import(module) expression loads the module and returns a promise that resolves into a module object that contains all its exports. It can be called from any place in the code.
// We can use it dynamically in any place of the code, for instance:
let modulePath = prompt("Which module to load?");
import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)
//using await
let obj = await import('./say.js');
let say = obj.default;
// or, in one line: let {default: say} = await import('./say.js');
say();
```

1. Top-level variables and functions from a module are not seen in other scripts.
2. If the same module is imported into multiple other places, its code is executed only the first time

```javascript
// 📁 alert.js
alert("Module is evaluated!");
// 📁 1.js
import `./alert.js`; // Module is evaluated!
// 📁 2.js
import `./alert.js`; // (shows nothing)
```

4. When a module exports an object:

```javascript
// 📁 admin.js
export let admin = {
  name: "John"
};
// If this module is imported from multiple files, the module is only evaluated the first time, admin object is created, and then passed to all further importers.
// All importers get exactly the one and only admin object:

// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";
// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete
// Both 1.js and 2.js imported the same obje
```

the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the admin object, other modules will see that.  

**Module scripts are deferred same effect as defer attribute**  

1. downloading external module scripts doesn’t block HTML processing, they load in parallel with other resources
2. module scripts wait until the HTML document is fully ready (even if they are tiny and load faster than HTML), and then run.
3. relative order of scripts is maintained: scripts that go first in the document, execute first.

```java
<script type="module">
  alert(typeof button); // object: the script can 'see' the button below
  // as modules are deferred, the script runs after the whole page is loaded
</script>
Compare to regular script below:
<script>
  alert(typeof button); // Error: button is undefined, the script can't see elements below
  // regular scripts run immediately, before the rest of the page is processed
</script>
<button id="button">Button</button>
// the second script actually runs before the first! So we’ll see undefined first, and then object
```

4. External scripts that have type="module" - they run only once even if included multiple times on a page and they require cors headers for security purpose i.e, the remote server must supply a header Access-Control-Allow-Origin allowing the fetch.
6. Async

```javascript
// all dependencies are fetched (analytics.js), and the script runs
// doesn't wait for the document or other <script> tags to get loaded
<script async type="module">
  import {counter} from './analytics.js';
  counter.count();
  </script>
```

------------------------------------------------------------------------------

------------------------------------------------------------------------------

## Cookies

1. Cookies are small strings of data that are stored directly in the browser.
2. Cookies are usually set by a web-server using response Set-Cookie HTTP-header. Then the browser automatically adds them to (almost) every request to the same domain using Cookie HTTP-header.
3. Mostly used for authentication
4. We can also access cookies from the browser, using document.cookie property.
5. document.cookie = "user=John"; to write a cookie in broowser
6. should not exceed 4KB. So we can’t store anything huge in a cookie.
7. The total number of cookies per domain is limited to around 20+, the exact limit depends on a browser.

e.g. cookie - document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"

#### Cookie options (The options are listed after key=value, delimited by ;)

1. Path
The url path prefix, the cookie will be accessible for pages under that path. Must be absolute. By default, it’s the current path.
If a cookie is set with path=/admin, it’s visible at pages /admin and /admin/something, but not at /home or /adminpage.
Usually, we should set path to the root: path=/ to make the cookie accessible from all website pages.
2. domain
By default, a cookie is accessible only at the domain that set it. So, if the cookie was set by site.com, we won’t get it other.com. Not even accissible to subdomain.
3. expires, max-age
If not present, cookie expires when the browser is closed
4. secure
The cookie should be transferred only over HTTPS. By default, if we set a cookie at <http://site.com>, then it also appears at <https://site.com> and vice versa.
5. httpOnly
The web-server uses Set-Cookie header to set a cookie. And it may set the httpOnly option.  
This option forbids any JavaScript access to the cookie. We can’t see such cookie or manipulate it using document.cookie.  
That’s used as a precaution measure, to protect from certain attacks when a hacker injects his own JavaScript code into a page and waits for a user to visit that page. That shouldn’t be possible at all, a hacker should not be able to inject their code into our site, but there may be bugs that let hackers do it.

## LocalStorage, sessionStorage (Web storage objects)

##### LocalStorage

1. Unlike cookies, web storage objects are not sent to server with each request
2. Can store upto 2 MB data
3. Also unlike cookies, the server can’t manipulate storage objects via HTTP headers. Everything’s done in JavaScript.
4. The storage is bound to the origin (domain/protocol/port triplet). That is, different protocols or subdomains infer different storage objects, they can’t access data from each other.
5. Both storage objects provide same methods and properties:

```javascript
setItem(key, value) – store key/value pair.
getItem(key) – get the value by key.
removeItem(key) – remove the key with its value.
clear() – delete everything.
key(index) – get the key on a given position.
length – the number of stored items.

// store in browser
localStorage.setItem('test', 1);
// get from browser
alert( localStorage.getItem('test') ); // 1
```

We only have to be on the same origin (domain/port/protocol), the url path can be different.
The localStorage is shared between all windows with the same origin, so if we set the data in one window, the change becomes visible in another one.

##### Sessionstorage

1. Properties and methods are the same as local storage, but it’s much more limited
2. The sessionStorage exists only within the current browser tab.
Another tab with the same page will have a different storage.  
sessionStorage.setItem('test', 1);  
sessionStorage.getItem('test')

## Debouncing and Throttling

Api rate limiting techniques  

1. DEBOUNCE  
Instead of calling api every single time, call only when there is a specific time gap between 2 api calls - used in input search autocomplete  
If user is typing a keyword, keyup event is called every single time, but make api call when there is a pause (say 300ms) see on flipkart website, autosuggestion changes only when you wait fir skme time after you type your keyword.  

```javascript
Doc.getElembyId.addEvntList('onkeyup', debounceCall) 

Let debounceCall = callApiWrapper(callSearchApi, 300) 

Func callApiwrapper(fn, time) {
let timer; //clusure helps in clearing timout of below retunred func
return function() {
  let arg = arguments;
  clearTimeout(timer)
   setTimeout(() => {
    fn.apply(this,args)
}, time) 

}
  
Func callSearchApi() {
console.log(' calling search api')
}
```

2. THROTTLING  
In debounce, if an event occurs before specifieed timeout, new timeout is created, that means, in case of input search autocomplete, if 300ms is gap and if we press 100 keys, the first func call would be made after 30 secs, and in throttling, no matter on the no. of evnts, the func would be executed exactly after 300ms (in case of window resize)

```javascript
Doc.getElembyId.addEvntList('onResize', throttleCalk) 

Let throttleCall = callResizeApiWrapper(resuzeApi, 300) 

Func callResizeApiwrapper(fn, time) {
let flg = true; //clusure helps in using this val on each fncall 
return function() {
if(flg){
  let arg = arguments
    fn.apply(this,args)
    flg=false;
   setTimeout(() => {
    flg=true // call next api only after certain interval of time
  }, time)
  } 
}
  
Func callSearchApi() {
console.log(' calling search api')
} 
```
