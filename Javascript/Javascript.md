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

#### Let, var, const
| Keyword | Scope                        | Hoisting | Reassignment | Block Scope | Can Be Redeclared |
|---------|------------------------------|----------|--------------|-------------|-------------------|
| `var`   | Function or Global           | Yes      | Yes          | No          | Yes               |
| `let`   | Block (Local)                | Yes but (not initialized), will throw cannot access before initializtion error | Yes  | Yes         | No                |
| `const` | Block (Local)                | Yes but (not initialized), will throw cannot access before initializtion error | No   | Yes         | No                |



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

**Null vs undefined**  
1. undefined means variable doesn't exists
2. null means variable exists but doesn't have any value
3. ```document.getElementByUd('123')```, if id is not present it will return null and not undefined
4. when defining a variable which will later hold a value, then initialize will null
5. undefined means there is a mistake, you might be trying to access a property which does not exists, null means property exists, so you are accessing it correctly, but the value is not present

```javascript
console.log(typeof undefined) // undefined
console.log(typeof null) // object
```


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
| **Object to Primitive**  | Converting an object to a primitive value.      | `let obj = { valueOf: () => 42 }; +obj;` When the unary plus operator (+) is applied to obj, JavaScript attempts to convert obj to a primitive value. It first checks if valueOf exists and is callable on obj. Since it does, it calls obj.valueOf(), which returns 42. | `42`    |
| **                       |                                                    | `let obj = { toString: () => 'Hello' }; String(obj);` | `'Hello'` |
| **                       |                                                    | `let obj = { [Symbol.toPrimitive]: () => 'Custom' }; +obj;` | `'Custom'` |

| Feature                   | Description                                                      | Example                                  | Output    |
|---------------------------|------------------------------------------------------------------|------------------------------------------|-----------|
| **Strict Equality (`===`)** | A comparison operator that checks both value and type equality. | `5 === 5;`                              | `true`    |
|                           |                                                                  | `'5' === 5;`                            | `false`   |
|                           |                                                                  | `true === 'true';`                      | `false`   |
|                           |                                                                  | `null === undefined;`                   | `false`    |
| **Nullish Coalescing (`??`)** | A logical operator that returns the right operand when the left operand is `null` or `undefined`. | `let x = null ?? 'Default';`            | `'Default'` |
|                           |                                                                  | `let y = 'Value' ?? 'Default';`         | `'Value'` |
------------------------------------------------------------------------------

## Hoisting
| Aspect                | Description                                                                                          |
|-----------------------|------------------------------------------------------------------------------------------------------|
| **What is Hoisting?** | Hoisting is a JavaScript behavior where variable and function declarations are moved to the top of their containing scope during the compilation phase, before code execution. |
| **What Happens?**     | During compilation, the JavaScript engine identifies variable and function declarations, lifts them to the top of their containing scope, and assigns them an initial value of `undefined`. In the example, `hoistedFunction` is available for calling before its actual declaration, and `x` is initialized to `undefined`. |
| **How to Use?**       | Variables declared with `var` are hoisted. Functions, both declared and assigned to variables, are hoisted. |
| **What is Hoisted?**  | - Function declarations (including function names and bodies) are hoisted. - Variable declarations with `var` are hoisted. |
| **What is Not Hoisted?** | - Variable assignments (values) are not hoisted. - Variables declared with `let` and `const` are hoisted but not initialized. - Function expressions (e.g., `const func = function() {...}`) are not hoisted. |
| **When to Use?**      | - Use hoisting for function declarations to enable calling functions before they are defined. - Be cautious with `var`-declared variables; it's often better to use `let` or `const` for block-scoped variables. |
| **Benefits for Developers** | - Helps avoid "not defined" errors when calling functions before their declarations. - Provides an understanding of the code structure as variables and functions are visually moved to the top of the scope, making the code more readable. - Supports coding styles where functions are declared at the bottom of a script for better readability. |

------------------------------------------------------------------------------

## Closure

| Aspect              | Description                                                                                         |
|---------------------|-----------------------------------------------------------------------------------------------------|
| **What is a Closure?** | A closure is a JavaScript feature that allows a function to remember and access its outer (enclosing) function's variables and parameters even after that outer function has finished executing. |
| **How Closures Work** | Closures are created when an inner function references variables from its containing outer function. The inner function "closes over" these variables, effectively preserving them, even if the outer function has completed execution. |
| **Use Cases**         | Closures are often used for data encapsulation, creating private variables, and maintaining state in functional programming. They are also fundamental in scenarios like callbacks and event handling. |
| **Benefits for Developers** | - Enables data encapsulation and creation of private variables, promoting better code organization and reducing global scope pollution. - Facilitates the creation of reusable and modular code through closures as callbacks. - Provides a powerful tool for managing and maintaining state in asynchronous programming, such as with event listeners. |

**Closure eamples**

 ```javascript
    function outerFunction(x) {
        // Inner function with closure over 'x'
        function innerFunction(y) {
            return x + y;
        }
        return innerFunction;
    }
    
    const closureInstance = outerFunction(10);
    const result = closureInstance(5); // 'x' still accessible
    console.log(result); // Outputs: 15                          
```

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
// due to closure - change var to let for o/p - 0 1, 2, 3
// note this means both let and var variables are accessbile inside closure but
// since let variables have block scope, a new i variable is created for each for loop
// and the older i variable is accessed in closure
// instead of let we can use IFFEs as well to ge o/p 0 1 2 3
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
| **Configuration**           | **Description**                                                                                                                                                                                                                                                     | **Example**                                                     |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| **Creating a Cookie**       | Set a cookie using the `Set-Cookie` HTTP response header. A cookie typically has a name and value, and optional attributes like expiration time, domain, and path.                                                                                                                                              | ```res.setHeader('Set-Cookie', 'username=johndoe'); ``` |
| **Reading a Cookie**        | Access cookie values in subsequent HTTP requests using the `Cookie` HTTP request header. In JavaScript, you can access cookies through `document.cookie` in the browser.                                                                                                                                                    | ```const username = req.headers.cookie; ```      |
| **Expiring a Cookie**       | Define an expiration time for a cookie using the `expires` attribute in the future. When the expiration time is reached, the browser automatically removes the cookie.                                                                                                                                                          | ```res.setHeader('Set-Cookie', 'username=johndoe; expires=Thu, 01 Jan 2024 00:00:00 GMT'); ``` |
| **Session Cookies**         | Create session cookies by not specifying an expiration time. These cookies are stored in memory and are deleted when the browser session ends.                                                                                                                                                                                 | ```res.setHeader('Set-Cookie', 'sessionID=123456'); ``` |
| **Persistent Cookies**      | Set a cookie with a specific expiration time using the `expires` attribute. Persistent cookies are stored on the client-side until the expiration time is reached.                                                                                                                                                        | ```res.setHeader('Set-Cookie', 'rememberMe=true; expires=Thu, 01 Jan 2025 00:00:00 GMT'); ``` |
| **Domain-Specific Cookies** | Specify a domain for the cookie using the `domain` attribute. This allows the cookie to be accessible only on the specified domain and its subdomains.                                                                                                                                                                            | ```res.setHeader('Set-Cookie', 'username=johndoe; domain=example.com'); ``` |
| **Path-Specific Cookies**   | Set a cookie with a specific path using the `path` attribute. The cookie is only sent to the server for URLs that match the specified path or its subpaths.                                                                                                                                                                 | ```res.setHeader('Set-Cookie', 'token=abc; path=/app'); ``` |
| **Secure Cookies**          | Create secure cookies by including the `secure` attribute. These cookies are only transmitted over secure HTTPS connections, not over HTTP.                                                                                                                                                                                     | ```res.setHeader('Set-Cookie', 'authToken=xyz; secure'); ``` |
| **HttpOnly Cookies**        | Make cookies inaccessible to JavaScript by using the `HttpOnly` attribute. This enhances security by preventing client-side scripts from accessing the cookie.                                                                                                                                                                 | ```res.setHeader('Set-Cookie', 'sessionID=123; HttpOnly'); ``` |
| **Same-Site Cookies**       | Control when cookies are sent in cross-origin requests using the `SameSite` attribute. It helps protect against Cross-Site Request Forgery (CSRF) attacks. Options include `Lax`, `Strict`, and `None`.                                                                                                                                               | ```res.setHeader('Set-Cookie', 'authToken=xyz; SameSite=Lax'); ``` |
| **Reading Cookies in JS**   | Access cookies in JavaScript on the client-side using `document.cookie`. You can read, modify, and delete cookies using this property.                                                                                                                                                                                          | ```const cookies = document.cookie; ```           |
| **Deleting a Cookie**       | Remove a cookie by setting its expiration time to a past date. This instructs the browser to delete the cookie immediately.                                                                                                                                                                                                           | ```res.setHeader('Set-Cookie', 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT'); ``` |

## Debouncing and Throttling

Api rate limiting techniques  

1. DEBOUNCE  
Instead of calling api every single time, call only when there is a specific time gap between 2 api calls - used in input search autocomplete  
If user is typing a keyword, keyup event is called every single time, but make api call when there is a pause (say 300ms) see on flipkart website, autosuggestion changes only when you wait fir skme time after you type your keyword.  

```javascript
// step 1  - create a api func which needs to be debounced
let apiCall = (arg) => {
    console.log('api call made ')
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('api call made with arg ', arg)
            resolve({apiRes : 'success'})
        }, 5000);
    })
    return promise;
}
// step 2 - create a debounced function
// this is like higer order func, will take a func and return a func
// so first create a func signature, take a func and return a new func in this func
let debounce = (apiCallFunc, debounceLimit) => {
    let interval = null; // closure application
    // returning new function
    return function () { // if array func is used, then this is empty {} since (learn this)
        return new Promise((resolve, reject) => {
            clearInterval(interval);
            let me = this;
            // console.log(me)
            let args = arguments;
            interval = setTimeout(async () => {
                let apiRes = await apiCallFunc.apply(me, args);
                resolve(apiRes);
            }, debounceLimit);
        })
        
    }

}
let debouncedApiCall = debounce(apiCall, 2000);
```

2. THROTTLING  
In debounce, if an event occurs before specifieed timeout, new timeout is created, that means, in case of input search autocomplete, if 300ms is gap and if we press 100 keys, the first func call would be made after 30 secs, and in throttling, no matter on the no. of evnts, the func would be executed exactly after 300ms (in case of window resize)

```javascript
// Function to be throttled
function handleScroll() {
    console.log('Scrolled');
    // Insert your scroll-related logic here
}
// Throttle function
function throttle(func, limit) {
    let lastTimestamp = 0;

    return function () {
        const context = this;
        const args = arguments;
        const now = Date.now();

        if (now - lastTimestamp >= limit) {
            func.apply(context, args);
            lastTimestamp = now;
        }
    };
}
// Create a throttled version of the scroll handler
const throttledScroll = throttle(handleScroll, 200);
// Example usage: Attach throttledScroll to the window's scroll event
window.addEventListener('scroll', throttledScroll);
// In this example, the 'handleScroll' function will be called at most every 200ms
// during a continuous scroll. This prevents the function from executing too frequently.

```
